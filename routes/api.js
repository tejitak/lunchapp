var express = require('express');
var fs = require('fs');
var http = require('http');
var url = require('url');
var fbAuth = require('./modules/fbAuth');
var xml2json = require('xml2json');
var router = express.Router();
var apiKeys = {};

// read _apikey.json
fs.readFile('_apikey.json', 'UTF-8', function (err, data) {
    if (err){ console.warn('Please create a file "_apikey.json"'); throw err; }
    apiKeys = JSON.parse(data);
    // set FB client_secret
    fbAuth.setClientSecret(apiKeys["fb_client_secret"]);
});

/**
 * @api {GET} /groups Get groups which an authenticated user joins
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"name":"test124","members":[{"id":"10152160532855662","name":"Takuya Tejima"}],"shops":[],"_id":"SeJUQcbMTmTHJAIH"}]
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "404 Unauthorized"
 *     }
 */
router.get('/groups', function(req, res) {
    var callback = function(authResponse){
        // filter by FB authenticated user
        var userId = authResponse.data.user_id;
        req.db.groups.find({"members.id": userId}, function(err, items){
            res.contentType('application/json');
            res.send(items);
        });
    };
    fbAuth.checkAccessToken(req.query.inputToken, callback);
});

/**
 * @api {GET} /groups/:id Get a specified group which an authenticated user joins
 *
 * @apiParam {Number} id Group unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"name":"test124","members":[{"id":"10152160532855662","name":"Takuya Tejima"}],"shops":[],"_id":"SeJUQcbMTmTHJAIH"}]
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "404 Unauthorized"
 *     }
 */
router.get('/group/:id', function(req, res) {
    var id = req.param("id");
    // TODO: return detail
    fbAuth.checkAccessToken(req.query.inputToken);
});

/*********************************
    POST /group
    contentType: application/json
    data: {
        inputToken: {accessToken},
        name: "group1",
        members: [{id: "123", name: "Tejitak"}],
        shops: []
    }
*********************************/
/**
 * @api {POST} /group Add a new group
 *
 * @apiParam {String} name Group name.
 * @apiParam {Array} members An array of member {id: "{fb_user_id}", name: ""}.
 * @apiParam {Array} shops An array of shops {id: "", name: ""}..
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {"success": true}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "404 Unauthorized"
 *     }
 */
router.post('/group', function(req, res) {
    var entry = req.body;
    var callback = function(authResponse){
        var newGroup = entry.group;
        if(newGroup){
            req.db.groups.insert(newGroup, function(err, newDoc){
                res.contentType('application/json');
                res.send('{"success":true}');                        
            });
        }
    }
    fbAuth.checkAccessToken(entry.inputToken, callback);
});

router.put('/group', function(req, res) {
    var entry = req.body;
    var callback = function(authResponse){
        var targetGroup = entry.group;
        if(targetGroup){
            // TODO: should use update?
            // TODO: return error when the id does not exist
            req.db.groups.find({"_id": targetGroup._id}, function(err, items){
                if(items && items.length > 0){
                    req.db.groups.remove({_id: targetGroup._id}, {}, function(err, numRemoved){
                        req.db.groups.insert(targetGroup, function(err, newDoc){
                            res.contentType('application/json');
                            res.send('{"success":true}');                                    
                        });
                    });
                }
            });
        }
    }
    fbAuth.checkAccessToken(entry.inputToken, callback);
});

/**
 * @api {DELETE} /groups/:id Delete a specified group
 *
 * @apiParam {Number} id Group unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {"success": true}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "404 Unauthorized"
 *     }
 */
router.delete('/group/:id', function(req, res) {
    var target = req.param("id");
    var callback = function(authResponse){
        req.db.groups.remove({_id: target}, {}, function(err, numRemoved){
            res.contentType('application/json');
            res.send('{"success":true}');     
        });
    };
    fbAuth.checkAccessToken(req.query.inputToken, callback);
});


/**
 * @api {GET} /shop/retrieve Get a specified shop information via external web API such as Gurunabi
 *
 * @apiParam {Number} shopId Shop unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "404 Unauthorized"
 *     }
 */
router.get('/shop/retrieve', function(req, res) {
    var urlStr = url.format({
        host: "api.gnavi.co.jp",
        pathname: '/ver1/RestSearchAPI/',
        protocol: 'http',
        query: {
            keyid: apiKeys["gurunabi"],
            id: req.query.shopId
        }
    });
    var apiReq = http.get(urlStr, function(apiRes) {
        apiRes.setEncoding('utf8');
        var body = '';
        apiRes.on('data', function(chunk) {
            body += chunk;
        });
        apiRes.on('end', function() {
            var json = xml2json.toJson(body);
            res.contentType('application/json');
            res.send(json);
        });
    }).on('error', function(e) {
        console.log(e);
    });
    apiReq.end();
});

module.exports = router;
