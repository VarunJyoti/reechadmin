var firebase = require('../config/firebase');
module.exports = function isAuthenticated(req, res, next) {
    console.log(firebase.auth().currentUser.uid);
    console.log(req.session.user.uid);
    
    if (firebase.auth().currentUser && req.session.user) {
        return next();    
    }
    res.redirect('/');
}
