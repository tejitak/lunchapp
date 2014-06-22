var express = require('express');
var fs = require('fs');
var router = express.Router();

// load templates
var _templates = {};
fs.readFile('./views/_templates/header.html', 'UTF-8', function (err, data) {
    if (err){ throw err; }
    _templates.header = data;
});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Lunch Timer!', header: _templates.header});
});

router.get('/getting-started', function(req, res) {
    res.render('getting-started', { title: 'Lunch Timer - Getting Started', header: _templates.header});
});

module.exports = router;
