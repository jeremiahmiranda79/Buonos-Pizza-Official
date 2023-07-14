// Util to check if logged in user is an Employee with admin permissions, all customers markes as non-admin by default
const isAdmin = (req, res, next) => {
    if (!req.session.admin) {
      res.redirect('/');
    } else {
      next();
    }
};

module.exports = isAdmin;