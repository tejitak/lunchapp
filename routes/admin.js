var express = require('express');
var fbAuth = require('./modules/fbAuth');
var templates = require('./modules/templates');
var resourceBundle = require('./modules/resourceBundle');
var local_settings = require('../local_settings').settings;
var router = express.Router();

router.get('/', function(req, res){
    var labels = resourceBundle.getLabels(req);
    res.render('admin/index', {
        title: labels.admin_group_title,
        templates: templates(req),
        config: local_settings,
        labels: labels
    });
});

module.exports = router;
