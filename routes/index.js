var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var db = req.db, groups = db.groups;
    console.log(groups);
    groups.find({}, function(err, docs){
       console.dir(docs);
       res.render('index', { title: 'Underscore templates', groups: docs });
    });
});

module.exports = router;
