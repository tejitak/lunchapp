var express = require('express');
var http = require('https');
var url = require('url');
var router = express.Router();

var FACEBOOK_API_PATH = 'graph.facebook.com';

var params = {
  host: FACEBOOK_API_PATH,
  pathname: '/oauth/access_token',
  protocol: 'https:',
  query: {
    'client_id': '1437481033176694',
    'client_secret': 'd83c9d2cc573cf4431d195bb81f08629',
    'grant_type': 'client_credentials'
  }
}

var urlStr = url.format(params);

var access_token;

var req = http.get(urlStr, function(res) {
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    access_token = chunk.split('=')[1];
  });
}).on('error', function(e) {
  console.log(e);
});

req.end();

var checkAccessToken = function(inputToken){

    var params = {
      host: FACEBOOK_API_PATH,
      path: '/debug_token',
      query: {
        'input_token': inputToken,
        'access_token': access_token,
      }
    }
    var urlStr = url.format(params);
    console.log(urlStr);
    http.get(urlStr, function(res) {
      res.on('data', function(chunk) {
        console.log('' + chunk);
      })
    }).on('error', function(e) {
      console.log(e);
    });
};

router.get('/groups', function(req, res) {
    checkAccessToken(req.query.inputToken);
    groups.find({}, function(err, items){
        // TODO: return json
    });
});

router.get('/group/:id', function(req, res) {
    checkAccessToken(req.body.accessToken);
    var id = req.param("id");
    groups.find({}, function(err, items){
        // TODO: return json

    });
});

module.exports = router;
