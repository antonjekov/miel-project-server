const {
    tokenBlacklist,
    userModel
} = require('../models');

const utils = require('../utils');
const authCookieName = require('../app-config').authCookieName;

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('login.hbs', {
                pageTitle: 'Login Page'
            });
        },

        register: (req, res, next) => {
            res.render('register.hbs', {
                pageTitle: 'Logout Page'
            });
        }
    },

    post: {
        login: async (req, res, next) => {
            try {
                const {
                    password,
                    username
                } = req.body;

                const user = await userModel.findOne({
                    username: username
                });
                if (!user) {
                    return res.status(401).json({
                        username: 'Wrong username or password!',
                        password: 'Wrong username or password!'
                    })
                };
                const matched = await user.matchPassword(password);
                if (!matched) {
                    return res.status(401).json({
                        username: 'Wrong username or password!',
                        password: 'Wrong username or password!'
                    })
                }

                const token = utils.jwt.createToken({
                    userId: user.id
                });
                /**When we make a cookie it's important to be with option httpOnly for security reasons. This mean that is not possible you to read it from client side with script.  It's not bad idea if we encript the token ... Here this is not implemented ...*/
                res.cookie(authCookieName, token, {
                    // httpOnly: true
                }).json(user);
            } catch (error) {
                if (error.name === 'ValidationError') {
                    const errors = Object.entries(error.errors).reduce((acc, curr) => {
                        acc[curr[0]] = curr[1].message
                        return acc
                    }, {});
                    res.status(422).json(errors)
                    return
                }
                next(error);
            }
        },

        register: async (req, res, next) => {
            try {
                const {
                    username,
                    name,
                    password
                } = req.body;

                const userExist = await userModel.findOne({
                    username: username
                });
                if (userExist) {
                    res.status(409).json({
                        username: 'This username exist. Please try with other username.'
                    })
                    return
                }
                const newUser = {
                    username,
                    name,
                    password
                };
                const createdUser = await userModel.create(newUser);
                res.status(200).json({
                    username: createdUser.username,
                    name: createdUser.name
                });
                return
            } catch (error) {
                if (error.name === 'ValidationError') {
                    const errors = Object.entries(error.errors).reduce((acc, curr) => {
                        acc[curr[0]] = curr[1].message
                        return acc
                    }, {});
                    res.status(422).json(errors)
                    return
                }
                next(error);
            }
        },

        logout: async (req, res, next) => {
            //This is not enaugh because token still is valid. Good Startegy is token to be valid no more than 10 minutes. And we to have refresh token for to renovate the token. After logout we save token in blacklist for not to be posible anybody to use it another time. Must have any script that periodicly clean blacklist from database. 
            try {
                const token = req.cookies[authCookieName];
                await tokenBlacklist.create({
                    token
                });
                res.clearCookie(authCookieName).end();
            } catch (err) {
                res.status(500);
                next(err);
            }
        },
    }
}