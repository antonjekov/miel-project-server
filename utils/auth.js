const jwt = require('./jwt');
const {
    authCookieName
} = require('../app-config');
const {
    userModel,
    tokenBlacklist
} = require('../models');


function auth() {
    return async function auth(req, res, next) {
        try {
            const token = req.cookies[authCookieName];
            if (!token) {
                req.isLoggedIn = false;
                next();
                return
            }
            const blacklistToken = await tokenBlacklist.findOne({
                token
            });
            if (blacklistToken) {
                req.isLoggedIn = false;
                next();
                return
            }
            const data = await jwt.verifyToken(token);
            if (!data) {
                req.isLoggedIn = false;
                next();
                return
            }
            const user = await userModel.findById(data.userId).lean();
            if (!user) {
                req.isLoggedIn = false;
                next();
                return
            }
            req.isLoggedIn = true;
            const {
                username,
                _id,
                role
            } = user;
            req.user = {
                username,
                _id,
                role
            };
            next();
        } catch (err) {
            req.isLoggedIn = false;
            next();
        }
    }
}

module.exports = auth;