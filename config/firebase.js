const admin = require('firebase');

var config = {
    apiKey: "AIzaSyCl-pBOkJpeMQ2xKsRfZuVeWAtU05tlafc",
    authDomain: "reechappweb-bc8bd.firebaseapp.com",
    databaseURL: "https://reechappweb-bc8bd.firebaseio.com",
    projectId: "reechappweb-bc8bd",
    storageBucket: "reechappweb-bc8bd.appspot.com",
    messagingSenderId: "731984470465"
};
admin.initializeApp(config);
module.exports = admin;
