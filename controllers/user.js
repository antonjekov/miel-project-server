const {
    tokenBlacklist,
    userModel
} = require('../models');

const utils = require('../utils');
const {
    authCookieName,
    authCookieMaxAge
} = require('../app-config');

module.exports = {
    get: {

        getInfoForUser: async (req, res, next) => {
            try {
                const {
                    user,
                    isLoggedIn
                } = req;
                if (!isLoggedIn) {
                    res.status(204).end()
                    return
                }
                const userInfo = await userModel.findById(user._id);
                const userObject = utils.userObjectModifier(userInfo)
                res.status(200).json(userObject);
            } catch (error) {
                res.status(500).end();
            }
        },
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
                const userObject = utils.userObjectModifier(user)
                /**When we make a cookie it's important to be with option httpOnly for security reasons. This mean that is not possible you to read it from client side with script.  It's not bad idea if we encript the token ... Here this is not implemented ...*/                
                res.cookie(authCookieName, token, {
                    httpOnly: true,
                    maxAge: authCookieMaxAge
                }).status(200).json(userObject);
            } catch (error) {
                if (error.name === 'ValidationError') {
                    const errors = Object.entries(error.errors).reduce((acc, curr) => {
                        acc[curr[0]] = curr[1].message
                        return acc
                    }, {});
                    res.status(422).json(errors)
                    return
                }
                res.status(500).end()
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
                const token = utils.jwt.createToken({
                    userId: createdUser.id
                });
                const userObject = utils.userObjectModifier(createdUser)
                /**When we make a cookie it's important to be with option httpOnly for security reasons. This mean that is not possible you to read it from client side with script.  It's not bad idea if we encript the token ... Here this is not implemented ...*/
                
                res.cookie(authCookieName, token, {
                    httpOnly: true,
                    maxAge: authCookieMaxAge
                }).status(201).json(userObject);
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
                res.status(500).end()
            }
        },

        logout: async (req, res, next) => {
            //This is not enaugh because token still is valid. Good Startegy is token to be valid no more than 10 minutes. And we to have refresh token for to renovate the token. After logout we save token in blacklist for not to be posible anybody to use it another time. Must have any script that periodicly clean blacklist from database. 
            try {
                const token = req.cookies[authCookieName];
                await tokenBlacklist.create({
                    token
                });
                res.clearCookie(authCookieName).status(204).end();
            } catch (err) {
                res.status(500).end();
            }
        },


    }
}