var express = require('express');
var templates = require('./modules/templates');
var resourceBundle = require('./modules/resourceBundle');
var local_settings = require('../local_settings').settings;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var labels = resourceBundle.getLabels(req);
    res.render('index', {
        title: labels.main_title,
        templates: templates(req),
        config: local_settings,
        labels: labels
    });
});

router.get('/getting-started', function(req, res) {
    var labels = resourceBundle.getLabels(req);
    res.render('getting-started', {
        title: labels.gettingStarted_title,
        templates: templates(req),
        config: local_settings,
        labels: labels
    });
});

router.get('/groups', function(req, res) {
    var labels = resourceBundle.getLabels(req);
    res.render('groups', {
        title: labels.admin_group_title,
        templates: templates(req),
        config: local_settings,
        labels: labels
    });
});

module.exports = router;
