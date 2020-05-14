function isAdmin(req, res, next) {
    if (req.user.role == 'user') return res.status(403).send('Access Denied! You are not admin');
    next();
}
module.exports = isAdmin;