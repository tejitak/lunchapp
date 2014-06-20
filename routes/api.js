var express = require('express');
var fbAuth = require('./modules/fbAuth');
var router = express.Router();

// TODO: read apikey.properties

// TODO: fbAuth.setClientSecret
fbAuth.setClientSecret();
// TODO: set gurunabi API key

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
    var shopId = req.query.shopId;
    // TODO: get request

    // TODO: parse XML via Gurunabi API

    // TODO: return json
    res.contentType('application/json');
    res.send('{"success":true}');
});

module.exports = router;
