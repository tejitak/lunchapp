var express = require('express');
var fs = require('fs');
var request=require('request');
var url = require('url');
var fbAuth = require('./modules/fbAuth');
var xml2json = require('xml2json');
var moment = require('moment');
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
 *  calculate diffrence between currenttime and configured time
 *  e.g.
 *  - current time: 11:00, configured time: 12:00
 *    moment().diff(moment("12:00", "HH:mm")) / (1000*60*60) -> -1
 *  - current time: 13:30, configured time: 13:00
 *    moment().diff(moment("13:00", "HH:mm")) / (1000*60*60) -> 0.5
 */
var getVoteState = function(group){
    var diffHours = moment().diff(moment(group.lunchTime, "HH:mm")) / (1000 * 60 * 60);
    // console.log("Time diff (h): " + diffHours);
    // "voted" during 6 hours after configured time
    return (0 < diffHours && diffHours < 6) ? "voted": "vote";
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
    var callback = function(authResponse){
        // filter by FB authenticated user
        var userId = authResponse.data.user_id;
        req.db.groups.find({"members.id": userId}, function(err, items){
            // set state by checking current time and group configured time
            if(items){
                for(var i=0, len=items.length; i<len; i++){
                    var group = items[i];
                    // set vote state "vote" or "voted"
                    var state = group.state = getVoteState(group);
                    if(state == "voted" && !group.decidedShop){
                        // first access for vote result time and set decidedShop entry
                        group.decidedShop = calcDecidedShop(group);
                        // update DB
                        req.db.groups.update({"_id": group._id}, group, {upsert: true}, function(err, numReplaced, newDoc) {});
                    }else if(state == "vote" && group.decidedShop){
                        // first access for voting time, reset will clear decidedShop entry
                        resetVotes(group, req);
                    }
                }
            }
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
        var userId = authResponse.data.user_id;
        addVotedByEntry(groupId, shopId, userId, req);
        res.contentType('application/json');
        res.send('{"success":true}');
    };
    fbAuth.checkAccessToken(entry.inputToken, callback);
});

router.delete('/vote', function(req, res) {
    var entry = req.body;
    var callback = function(authResponse){
        var groupId = entry.groupId;
        var shopId = entry.shopId;
        var userId = authResponse.data.user_id;
        deleteVotedByEntry(groupId, shopId, userId, req, res);
        res.contentType('application/json');
        res.send('{"success":true}');
    };
    fbAuth.checkAccessToken(entry.inputToken, callback);
});

// Adds a shop[shopId].votedBy entry with userId into the database document for group._id = groupId
function addVotedByEntry(groupId, shopId, userId, req){
    // store the userId to the target shop object as a votedBy entry
    //
    // TODO: Cannot change value in array of a sub document. It is maybe NeDB bug?
    //
    //   req.db.groups.update({"_id": groupId, "shops.id": shopId}, {$push: {"shops.$.votedBy": userId}}, {}, function(err, numReplaced, newDoc) {})
    //
    // In mongo DB, the above should work. The following is a workaround for NeDB
    req.db.groups.find({"_id": groupId}, function(err, items) {
        if(items && items[0]){
            var item = items[0];
            for(var i=0, len=item.shops.length; i<len; i++){
                var shop = item.shops[i];
                if(shop.id === shopId){
                    if(!shop.votedBy){ shop.votedBy = []; }
                    if(shop.votedBy.indexOf(userId) == -1){
                        shop.votedBy.push(userId);
                    }
                    break;
                }
            }
            req.db.groups.update({"_id": groupId, "shops.id": shopId}, item, {upsert: true}, function(err, numReplaced, newDoc) {});
        }
    });
}

// Deletes a shop[shopId].votedBy entry with userId in the database document for group._id = groupId
function deleteVotedByEntry(groupId, shopId, userId, req){
    req.db.groups.find({"_id": groupId}, function(err, items) {
        if(items && items[0]){
            var item = items[0];
            for(var i=0, len=item.shops.length; i<len; i++){
                var shop = item.shops[i];
                if(shop.id === shopId){
                    if(!shop.votedBy){ shop.votedBy = []; }
                    var index = shop.votedBy.indexOf(userId);
                    if(index != -1){
                        shop.votedBy.splice(index, 1);
                    }
                    break;
                }
            }
            req.db.groups.update({"_id": groupId, "shops.id": shopId}, item, {upsert: true}, function(err, numReplaced, newDoc) {});
        }
    });
}

// Maybe useful for a new voting round. Clears all shops.votedBy arrays and sets decidedShop to ""
function resetVotesByGroupId(groupId, req){
    req.db.groups.find({"_id": groupId}, function(err, items) {
        if(items && items[0]){
            resetVotes(items[0], req);
        }
    });
}

function resetVotes(group, req){
    for(var i=0, len=group.shops.length; i<len; i++){
        var shop = group.shops[i];
        // the decided shop's visited count will be incremented for first access to voting time
        if(shop.id === group.decidedShop){
            shop.visitedCount = (shop.visitedCount - 0) + 1;
        }
        shop.votedBy = [];
    }
    group.state = "vote"
    group.decidedShop = "";
    req.db.groups.update({"_id": group._id}, group, {upsert: true}, function(err, numReplaced, newDoc) {});
}

/*
* A function that returns the current state by comparing current time with lunchtime.
* @param {lunchTime} a String formatted as: "HH:MM"
* @return a String with either "vote" or "voted" as it's value.
*/
function calculateState(lunchTime){
    var res = lunchTime.split(":");
    var d = new Date();
    var H = parseInt(res[0])%24;
    var M = parseInt(res[1]);
    var state = "vote";
    for(var i = 0, interval = 6; i<=interval;i++){
        if(d.getHours() === H){
            if(i === 0){
                if(M - d.getMinutes() <= 0){
                    state = "voted";
                    break;
                }
            }else if(i === interval){
                if(M - d.getMinutes() >= 0){
                    state = "voted";
                    break;
                }
            }else{
                state = "voted";
                break;
            }
        }
        H = (H+1)%24;
    } //all other times are in voting range. For example if lunch time is 12:00 the for-loop would indicate that the voting is closed between times 12:00-18:00
    return state;
}
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
        var apiReq=request(urlStr, function (error, response, body) {
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
        var shopURLReq=request(shopURL, function (error, response, body) {
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

module.exports = router;
