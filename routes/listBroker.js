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
router.get('/listBroker', function (req, res, next) {
    var license = req.params.id || "";
    var startIdx = parseInt(req.query.start);
    var len = parseInt(req.query.length);

    var resJson = {}
    resJson.recordsTotal = brokersJson.data.length;
    resJson.recordsFiltered = brokersJson.data.length;
    resJson.data = brokersJson.data.slice(startIdx, startIdx + len)
    //res.json(resJson);
    
    var ref = db.ref('agentDB').orderByChild("lic_number");
    if (startIdx == 0) {
        ref.limitToFirst(len);
    } else {
        ref.startAt(last).limitToFirst(len);
    }
    ref.on("value", function(s) {
        var obj = s.val();

        var resObjs = [];
        for (var objkey in obj) {
            dbObj = obj[objkey]
            var resObj = {"key":objkey};
            last = dbObj["lic_number"];
            for (var prop in dbObj) {
                {
                    resObj[prop] = dbObj[prop]
                }
            }
            resObjs.push(resObj);
        }
        res.json({"data":resObjs})
    });
});

module.exports = router;