const jwt = require('jsonwebtoken');
const {jwtSecret,jwtOptions} = require('../app-config');

function createToken(data) {
    return jwt.sign(data, jwtSecret, jwtOptions)
};

function verifyToken(token) {
    return jwt.verify(token, jwtSecret, jwtOptions)
};

module.exports = {
    createToken,
    verifyToken
}