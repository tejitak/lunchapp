var express = require('express');

var router = express.Router();

/* GET users listing. */
var renderList = function(req, res) {
    var db = req.db, groups = db.groups;
    groups.find({}, function(err, items){
       res.render('admin/index', {title: 'Lunch Timer!', groups: items});
    });
};

router.get('/', renderList);


router.get('/login', function(req, res){
    res.render('admin/login', { title: 'Login page for Lunch Timer administration' });
});

router.get('/group/add', function(req, res) {
    // TODO: check token

    // TODO: return json

});

router.get('/group/edit/:id', function(req, res) {
    // TODO: check token
    res.render('group/add', {title: 'Edit a Group', id: req.param.id});
    // TODO: return json

});

router.post('/group/add', function(req, res) {
    // TODO: check token
    var entry = req.body;
    if(entry.name){
        req.db.groups.insert({name: entry.name,members: entry.members,restaurants: entry.restaurants}, function(err, newDoc){});
    }
    // TODO: return json
});

router.get('/group/delete/:id', function(req, res) {
    // TODO: check token
    var id = req.param("id");
    if(id){
        req.db.groups.remove({_id: id}, {}, function(err, numRemoved){});
    }
    // TODO: return json
});

module.exports = router;
