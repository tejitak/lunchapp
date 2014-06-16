var express = require('express');
var fs = require('fs');
var fbAuth = require('./modules/fbAuth');
var router = express.Router();

// load templates
var _templates = {};
fs.readFile('./views/_templates/header.html', 'UTF-8', function (err, data) {
    if (err){ throw err; }
    _templates.header = data;
});

// TODO: to be removed, api.js will be used
var renderList = function(req, res, authResponse) {
    req.db.groups.find({}, function(err, items){
        res.render('admin/index', {title: 'Lunch Timer!', header: _templates.header, groups: items});
    });
};

router.get('/', function(req, res){
    var callback = function(authResponse){
        renderList(req, res, authResponse);
    };
    // TODO: temp to be removed
    callback();
    // fbAuth.checkAccessToken(req.query.inputToken, callback);
});

// TODO: to be removed, api.js will be used
router.get('/ui/add', function(req, res) {
    res.render('admin/add', {title: 'Add a Group'});
});

// TODO: to be removed, api.js will be used
router.get('/ui/edit/:id', function(req, res) {
    // TODO: check token
    res.render('admin/add', {title: 'Edit a Group', id: req.param.id});
});

// TODO: to be removed, api.js will be used
router.get('/delete/:id', function(req, res) {
    var callback = function(authResponse){
        req.db.groups.remove({_id: req.param("id")}, {}, function(err, numRemoved){});
        renderList(req, res, authResponse);
    };
    // TODO: temp to be removed
    callback();
    // fbAuth.checkAccessToken(req.query.inputToken, callback);
});

module.exports = router;
