var express = require('express');
var fs = require('fs');
var router = express.Router();

// load templates
var _templates = {};
fs.readFile('./views/_templates/header.html', 'UTF-8', function (err, data) {
    if (err){ throw err; }
    _templates.header = data;
});

/* GET users listing. */
var renderList = function(req, res) {
    var db = req.db, groups = db.groups;
    groups.find({}, function(err, items){
       res.render('admin/index', {title: 'Lunch Timer!', header: _templates.header, groups: items});
    });
};

router.get('/', renderList);


router.get('/login', function(req, res){
    res.render('admin/login', { title: 'Login page for Lunch Timer administration' });
});



router.get('/ui/add', function(req, res) {
    res.render('admin/add', {title: 'Add a Group'});
});

router.get('/ui/edit/:id', function(req, res) {
    // TODO: check token
    res.render('admin/add', {title: 'Edit a Group', id: req.param.id});
    // TODO: return json
});

router.post('/add', function(req, res) {
    // TODO: check token
    var entry = req.body;
    if(entry.name){
        req.db.groups.insert({name: entry.name,members: entry.members,restaurants: entry.restaurants}, function(err, newDoc){});
    }
        renderList(req, res);
    // TODO: return json
});

router.get('/delete/:id', function(req, res) {
    // TODO: check token
    var id = req.param("id");
    if(id){
        req.db.groups.remove({_id: id}, {}, function(err, numRemoved){});
    }
    renderList(req, res);
    // TODO: return json
});

module.exports = router;
