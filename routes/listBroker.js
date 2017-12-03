var express = require('express');
var brokersJson = require('../brokers.json');
const router = express.Router();

router.get('/listBroker', function(req, res, next) {
    var license = req.params.id || "";

    res.json(brokersJson);
});

module.exports = router;