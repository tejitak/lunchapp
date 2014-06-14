var express = require('express');
var http = require('https');
var url = require('url');
var router = express.Router();

var FACEBOOK_API_PATH = 'graph.facebook.com';

var access_token;
var params = {
  host: FACEBOOK_API_PATH,
  pathname: '/oauth/access_token',
  protocol: 'https',
  query: {
    'client_id': '1437481033176694',
    'client_secret': 'd83c9d2cc573cf4431d195bb81f08629',
    'grant_type': 'client_credentials'
  }
}
var urlStr = url.format(params);
var req = http.get(urlStr, function(res) {
  res.setEncoding('utf8');

  var body = '';

  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    access_token = body.split('=')[1];
    console.log('Access token: ' + access_token);
  });
}).on('error', function(e) {
  console.log(e);
});

req.end();

var checkAccessToken = function(inputToken){

    var params = {
      host: FACEBOOK_API_PATH,
      pathname: '/debug_token',
      protocol: 'https',
      query: {
        'input_token': inputToken,
        'access_token': access_token,
      }
    }

    var urlStr = url.format(params);
    var req = http.get(urlStr, function(res) {
      res.setEncoding('utf8');

      var body = '';

      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        var resJson = JSON.parse(body);
        if (!resJson.data || !resJson.data.is_valid) {
          throw new Error('Invalid access token');
        }
      });
    }).on('error', function(e) {
      console.log(e);
      res.send('{"success":false}');
    });

    req.end();
};

router.get('/groups', function(req, res) {
    checkAccessToken(req.query.inputToken);
    // req.db.groups.find({}, function(err, items){
    //     // TODO: return json
    // });
    res.contentType('application/json');
    res.send('{"success":true}');
});

router.get('/group/:id', function(req, res) {
    checkAccessToken(req.body.accessToken);
    var id = req.param("id");
    // groups.find({}, function(err, items){
    //     // TODO: return json
    // });
});

module.exports = router;
