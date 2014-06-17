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

router.get('/', function(req, res){
    res.render('admin/index', {title: 'Lunch Timer Admin', header: _templates.header});
});

module.exports = router;
