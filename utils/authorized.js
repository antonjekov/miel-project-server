function authorized(userRole) {
    return (req, res, next) => {
        if (!req.isLoggedIn) {
            res.status(401).end()
            return
        }
        const role = req.user.role;
        if (role !== userRole) {
            res.status(401).end()
            return
        }
        next();
    }
}

module.exports = authorized;