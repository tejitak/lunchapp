var express = require('express');
var fbAuth = require('./modules/fbAuth');
var router = express.Router();

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
    fbAuth.checkAccessToken(req.body.accessToken);
    var id = req.param("id");
    // TODO: return detail
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
 *     {"success":true}
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
            req.db.groups.insert({
                name: newGroup.name,
                members: newGroup.members,
                shops: newGroup.shops
            }, function(err, newDoc){});
        }
        res.contentType('application/json');
        res.send('{"success":true}');        
    }
    fbAuth.checkAccessToken(entry.inputToken, callback);
});

module.exports = router;
