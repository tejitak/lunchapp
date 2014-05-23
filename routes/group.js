var express = require('express');

var router = express.Router();

/* GET users listing. */
var renderList = function(req, res) {
    var db = req.db, groups = db.groups;
    groups.find({}, function(err, items){
       res.render('group/index', {title: 'List Groups', groups: items});
    });
};

router.get('/', renderList);

router.get('/ui/add', function(req, res) {
    res.render('group/add', {title: 'Add a Group'});
});

router.get('/ui/edit/:id', function(req, res) {
    res.render('group/add', {title: 'Edit a Group', id: req.param.id});
});

router.post('/add', function(req, res) {
    var entry = req.body;
    if(entry.name){
        req.db.groups.insert({name: entry.name}, function(err, newDoc){});
    }
    renderList(req, res);
});

router.get('/delete/:id', function(req, res) {
    var id = req.param("id");
    if(id){
        req.db.groups.remove({_id: id}, {}, function(err, numRemoved){});
    }
    renderList(req, res);
});

module.exports = router;
