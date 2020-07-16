function authorized() {
    return async function auth(req, res, next) {
        if (!req.isLoggedIn) {
            req.isAuthorized=false;
            next();
            return;
        }
        const {role}=req.user;
        role==='admin'? req.isAuthorized=true:isAuthorized=false;
        next();        
    }
}

module.exports = authorized;