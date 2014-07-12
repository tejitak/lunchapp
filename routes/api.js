var express = require('express');
var fs = require('fs');
var request = require('request');
var url = require('url');
var fbAuth = require('./modules/fbAuth');
var xml2json = require('xml2json');
var moment = require('moment');
var momentTz = require('moment-timezone');
var evernote = require('./modules/evernote');
var router = express.Router();
var apiKeys = {};

var models = require('../models');
var Group = models.Group;

// read apikey.json
fs.readFile('apikey.json', 'UTF-8', function (err, data) {
    if (err){ console.warn('Please create a file "apikey.json"'); throw err; }
    apiKeys = JSON.parse(data);
    // set FB client_secret
    fbAuth.init(apiKeys["fb_client_id"], apiKeys["fb_client_secret"]);
    evernote.init(apiKeys["evernote_consumerKey"], apiKeys["evernote_consumerSecret"], apiKeys["evernote_sandbox"]);
});


/**
 *  calculate diffrence between currenttime and configured time
 *  e.g.
 *  - current time: 11:00, configured time: 12:00
 *    moment().diff(moment("12:00", "HH:mm")) / (1000*60*60) -> -1 (and then swapped to 23 ("vote"))
 *  - current time: 13:30, configured time: 13:00
 *    moment().diff(moment("13:00", "HH:mm")) / (1000*60*60) -> 0.5
 *  - current time: 01:00, configured time: 21:00
 *    moment().diff(moment("21:00", "HH:mm")) / (1000*60*60) -> -20 (and then changed to 4 ("voted"))
 */
var calcVoteState = function(lunchTime, timezone){
    // Z -> +0000 (GMT), +0900 (JST)
    var diffHours = moment().diff(moment.tz(lunchTime, "HH:mm", timezone)) / (1000 * 60 * 60);
    diffHours = (diffHours + 24) % 24; // Makes sure diffHours isn't negative by adding another day (24h) and using the modulus operator.
    // console.log("Time diff (h): " + diffHours);
    // "voted" during 6 hours after configured time
    return (diffHours < 6) ? "voted": "vote";
};


var calcDecidedShop = function(group, excludeShopId){
    if(!group.shops || group.shops.length == 0){ return; }
    var shops = clone(group.shops);
    // descending sort by votedCount
    shops.sort(function(s1, s2){
        return s2.votedBy.length - s1.votedBy.length;
    });
    var highScore = shops[0].votedBy.length;
    var highScoreList = [];
    for(var i=0, len=shops.length; i<len; i++){
        if(highScore === shops[i].votedBy.length && shops[i].id !== excludeShopId){
            highScoreList.push(shops[i]);
        }
    }
    // ascending sort by
    highScoreList.sort(function(s1, s2){
        return s1.visitedCount - s2.visitedCount;
    });
    // first, highscore and less visited shop will be choosen
    // if same visited counts exist, return with random
    var lessVisited = highScoreList[0].visitedCount;
    var sameVisitedCountList = [];
    for(var i=0, len=highScoreList.length; i<len; i++){
        if(lessVisited === highScoreList[i].visitedCount){
            sameVisitedCountList.push(highScoreList[i]);
        }
    }
    // console.dir(sameVisitedCountList);
    var decidedShop = (sameVisitedCountList.length > 1) ? sameVisitedCountList[Math.floor(Math.random() * sameVisitedCountList.length)] : sameVisitedCountList[0];
    return decidedShop && decidedShop.id || "";
};

var clone = function(obj) {
   return JSON.parse(JSON.stringify(obj));
};

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
    var callback = function(err, authResponse){
        if (err) {
            res.contentType('application/json');
            res.send('{"error":' + error.message + '}')
            return;
        }
        // filter by FB authenticated user
        var userId = authResponse.data.user_id;
        Group.findByMemberId(userId, function (err, items) {
            if (err) console.log(err);
            // set state by checking current time and group configured time
            if(items){
                for(var i=0, len=items.length; i<len; i++){
                    var group = items[i];
                    // set vote state "vote" or "voted"
                    var expectedState = calcVoteState(group.lunchTime, group.timezone);
                    Group.changeStateIfRequired(group, expectedState, calcDecidedShop);
                }
            }
            res.contentType('application/json');
            // Note: returns items not saved yet
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
    var callback = function(err, authResponse) {
        if (err) {
            res.contentType('application/json');
            res.send('{"error":' + err.message + '}')
            return;
        }
        var userId = authResponse.data.user_id;
        var id = req.param("id");
        Group.findByGroupId(userId, id, function(err, items) {
            res.contentType('application/json');
            res.send(items[0] || {});
        });
    }
    fbAuth.checkAccessToken(req.query.inputToken, callback);
});

/**
 * @api {POST} /group Add a new group
 *
 * @apiParam {String} name Group name.
 * @apiParam {Array} members An array of member [{id: "{fb_user_id}", name: ""}].
 * @apiParam {Array} shops An array of shops [{id: "", name: ""}].
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
    var callback = function(err, authResponse){
        if (err) {
            res.contentType('application/json');
            res.send('{"error":' + err.message + '}')
            return;
        }
        var newGroup = entry.group;
        if(newGroup){
            var userId = authResponse.data.user_id;
            Group.updateGroupByJSON(userId, newGroup, function() {
                res.contentType('application/json');
                res.send('{"success":true}');
            })
        }
    }
    fbAuth.checkAccessToken(entry.inputToken, callback);
});

// TODO validation is required
router.put('/group', function(req, res) {
    var entry = req.body;
    var callback = function(err, authResponse){
        if (err) {
            res.contentType('application/json');
            res.send('{"error":' + error.message + '}')
            return;
        }
        var targetGroup = entry.group;
        if(targetGroup){
            var userId = authResponse.data.user_id;
            Group.updateGroupByJSON(userId, targetGroup, function() {
                res.contentType('application/json');
                res.send('{"success":true}');
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
    var callback = function(err, authResponse){
        if (err) {
            res.contentType('application/json');
            res.send('{"error":' + error.message + '}')
            return;
        }
        var userId = authResponse.data.user_id;
        Group.removeGroup(userId, target, function(err, num) {
            res.contentType('application/json');
            res.send('{"success":true}');
        })
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
    var callback = function(err, authResponse){
        if (err) {
            res.contentType('application/json');
            res.send('{"error":' + error.message + '}')
            return;
        }
        var groupId = entry.groupId;
        var shopId = entry.shopId;
        var userId = authResponse.data.user_id;
        Group.vote(userId, groupId, shopId, function() {
            res.contentType('application/json');
            res.send('{"success":true}');
        });
    };
    fbAuth.checkAccessToken(entry.inputToken, callback);
});

router.delete('/vote', function(req, res) {
    var entry = req.body;
    var callback = function(err, authResponse){
        if (err) {
            res.contentType('application/json');
            res.send('{"error":' + error.message + '}')
            return;
        }
        var groupId = entry.groupId;
        var shopId = entry.shopId;
        var userId = authResponse.data.user_id;
        Group.unvote(userId, groupId, shopId, function() {
            res.contentType('application/json');
            res.send('{"success":true}');
        });
    };
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
        var apiReq = request(urlStr, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                response.setEncoding('utf8');
                var json = xml2json.toJson(body);
                res.contentType('application/json');
                res.send(json);
            };
        });
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
        var shopURLReq = request(shopURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                response.setEncoding('utf8');
                var re = /<body.*data-r.*\"sid\":\"(\w+)\",\"/g;
                var result = re.exec(body);
                if(result && result[1]){
                    callAPI(result[1]);
                };
            };
        });

        shopURLReq.end();
    }
});

router.get('/evernote/authenticate', function(req, res) {
    evernote.authenticate(req, res);
});

module.exports = router;
