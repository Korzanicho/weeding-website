// middleware/auth.js
module.exports = (req, res, next) => {
    if (req.session && req.session.authorized) {
        return next();
    }
    res.redirect('/login');
};
