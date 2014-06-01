var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
    res.render('admin/index', { title: 'Lunch Timer!' });
});

router.get('/login', function(req, res){
    res.render('admin/login', { title: 'Login page for Lunch Timer administration' });
});

router.get('/group/add', function(req, res) {
    // TODO: check token

    // TODO: return json

});

router.get('/group/edit/:id', function(req, res) {
    // TODO: check token
    
    // TODO: return json

});

router.post('/group/add', function(req, res) {
    // TODO: check token
    
    var entry = req.body;
    if(entry.name){
        req.db.groups.insert({name: entry.name}, function(err, newDoc){});
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
