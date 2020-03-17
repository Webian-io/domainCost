var express = require('express');
var router = express.Router();
var domainProcessor = require('../processor/domain');

router.get('/domain/check', function(req, res, next) {
    var domain = req.query.domain;
    var domainProcessorInstance = new domainProcessor;

    var compareDomainePromise = new Promise(function(resolve, reject) {
        domainProcessorInstance.compare(resolve, reject, domain);
    });

    compareDomainePromise.then(function (response) {
        return res.json(response);
    });

    compareDomainePromise.catch(function (response) {
        return res.json();
    });
});

module.exports = router;