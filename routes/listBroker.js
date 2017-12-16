var express = require('express');
var brokersJson = require('../brokers.json');
const router = express.Router();
const admin = require('firebase-admin');
const reechWebAccount = require("../reechappweb.json");
admin.initializeApp({
    credential: admin.credential.cert(reechWebAccount),
    databaseURL: "https://reechappweb-bc8bd.firebaseio.com"
});
const db = admin.database();
var last ;
router.get('/', function (req, res, next) {
    var license = req.params.id || "";
    var startIdx = parseInt(req.query.start);
    var len = 2;//parseInt(req.query.length);

    var resJson = {}
    resJson.recordsTotal = brokersJson.data.length;
    resJson.recordsFiltered = brokersJson.data.length;
    resJson.data = brokersJson.data.slice(startIdx, startIdx + len)
    //res.json(resJson);
    
    var ref= db.ref('contactDB').orderByChild("license");//.startAt(3,"id");//.limitToFirst(3);
    console.log("startidx" + startIdx);
    /*if (startIdx == 0) {
        ref= db.ref('contactDB').orderByChild("license").limitToFirst(len);
        console.log("ifff");
    } else {
        console.log(last)
        ref= db.ref('contactDB').orderByChild("license").startAt("1212").limitToFirst(len);
    }

     */
   
    db.ref('contactDB').orderByChild("license").on("value", function (snapshot) {
        this.resObjs = [];
        snapshot.forEach(function(messageSnapshot) {
        //for (var messageSnapshot in snapshot) {
            //console.log(messageSnapshot.key);
            dbObj = messageSnapshot.val()
            dbObj["key"] = messageSnapshot.key;

            this.resObjs.push(dbObj);
        });
        res.json({"data": this.resObjs})
    });
});

module.exports = router;