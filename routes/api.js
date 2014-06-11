var express = require('express');
var router = express.Router();

var checkAccessToken = function(accessToken){
    // TODO: check token

};

router.post('/groups', function(req, res) {
    checkAccessToken(req.body.accessToken);
    groups.find({}, function(err, items){
        // TODO: return json

    });
});

router.get('/group/:id', function(req, res) {
    checkAccessToken(req.body.accessToken);
    var id = req.param("id");
    groups.find({}, function(err, items){
        // TODO: return json
        
    });
});

module.exports = router;
