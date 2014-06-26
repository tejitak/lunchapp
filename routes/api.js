var express = require('express');
var fs = require('fs');
var http = require('http');
var url = require('url');
var fbAuth = require('./modules/fbAuth');
var xml2json = require('xml2json');
var router = express.Router();
var apiKeys = {};

// read apikey.json
fs.readFile('apikey.json', 'UTF-8', function (err, data) {
    if (err){ console.warn('Please create a file "apikey.json"'); throw err; }
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
    var callback = function(authResponse) {
      var userId = authResponse.data.user_id;
      var id = req.param("id");
      req.db.groups.find({"members.id": userId, "_id": id}, function(err, items) {
        res.contentType('application/json');
        res.send(items);
      });
    }
    fbAuth.checkAccessToken(req.query.inputToken, callback);
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
        newGroup.administrator = authResponse.data.user_id;
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
          req.db.groups.update({"_id": targetGroup._id}, targetGroup, {upsert:true}, function(err, items){
            res.contentType('application/json');
            res.send('{"success":true}')
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
        var userId = authResponse.data.user_id;
        req.db.groups.remove({_id: target, administrator: userId}, function(err, numRemoved){
            res.contentType('application/json');
            res.send('{"success":true}');
        });
    };
    fbAuth.checkAccessToken(req.query.inputToken, callback);
});

/**
 * @api {POST} /vote Vote to a shop in a group
 *
 * @apiParam {String} groupId Group ID.
 * @apiParam {String} shopId Shop ID.
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
router.post('/vote', function(req, res) {
    var entry = req.body;
    var callback = function(authResponse){
        var groupId = entry.groupId;
        var shopId = entry.shopId;
        console.log("Vote to group: " + groupId + ", shop: " + shopId);
        // TODO: store the userId to the target shop object as a votedBy entry
        
        res.contentType('application/json');
        res.send('{"success":true}');
    }
    fbAuth.checkAccessToken(entry.inputToken, callback);
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
    var callAPI = function(sid){
        var urlStr = url.format({
            host: "api.gnavi.co.jp",
            pathname: '/ver1/RestSearchAPI/',
            protocol: 'http',
            query: {
                keyid: apiKeys["gurunabi"],
                id: sid
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
    };

    var shopURL = req.query.shopURL;
    if(!shopURL){ /* TOOD: return error */ }
    if(shopURL.indexOf("mobile.gnavi.co.jp") != -1){
        // the id in URL can be used as sid for mobile site
        // e.g. http://mobile.gnavi.co.jp/shop/gdtp400/
        var re = /mobile.gnavi.co.jp\/shop\/(.*)\//g;
        var result = re.exec(shopURL);
        if(result && result[1]){
            callAPI(result[1]);
        }
    }else{
        // the id in URL is not same as sid sometimes for PC site
        var shopURLReq = http.get(shopURL, function(shopURLRes) {
            shopURLRes.setEncoding('utf8');
            var shopHTMLContent = '';
            shopURLRes.on('data', function(chunk) {
                shopHTMLContent += chunk;
            });
            shopURLRes.on('end', function() {
                var re = /<body.*data-r.*\"sid\":\"(\w+)\",\"/g;
                var result = re.exec(shopHTMLContent);
                console.dir(result);
                if(result && result[1]){
                    callAPI(result[1]);
                }
            });
        }).on('error', function(e) {
            console.log(e);
        });
        shopURLReq.end();
    }  
});

module.exports = router;
