var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Lunch Timer!' });
});


router.get('/login', function(req, res) {
    res.render('login', { title: 'Login page for Lunch Timer' });
});

module.exports = router;
