const authCookieName = 'auth_cookie';
const authCookieMaxAge = 24*60*60*1000
const bcryptSaltRounds = 10;
const jwtOptions = {
    expiresIn: '24h'
};
const jwtSecret = 'MySuperPrivateSecret';

module.exports={
    authCookieName,
    bcryptSaltRounds,
    jwtOptions,
    jwtSecret,
    authCookieMaxAge
}