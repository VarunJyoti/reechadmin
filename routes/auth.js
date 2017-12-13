var express = require('express');
var router = express.Router();

module.exports = function (admin) {
    router.post('/login', function (req, res, next) {
        admin.auth().setPersistence(admin.auth.Auth.Persistence.NONE)
            .then(function () {
                admin.auth().signInWithEmailAndPassword(req.body.username, req.body.password)
                    .then(function (user) {
                        req.session.user = user;
                        res.send(user);
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        res.send(errorMessage);
                        // ...
                    });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });


    });

    router.get('/logout', function (req, res) {
        console.log(admin.auth().currentUser);
        admin.auth().signOut().then(function () {
            req.session.user = null;
            res.redirect("/");
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    });

    return router;
}
