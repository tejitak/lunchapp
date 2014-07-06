var assert = require("assert");
var fs = require('fs');
var fbAuth = require('../routes/modules/fbAuth.js');

var client_secret;

describe('fbAuth', function() {
  before(function(done) {
    fs.readFile('apikey.json', 'UTF-8', function (err, data) {
        if (err){ console.warn('Please create a file "apikey.json"'); throw err; }
        var apiKeys = JSON.parse(data);
        client_secret = apiKeys["fb_client_secret"];
        done();
    });
  });
  describe('#setClientSecret()', function() {
    it('test set client secret', function(done) {
      fbAuth.setClientSecret(client_secret, function() {
          done();
      });
    });
  });
  describe('#checkAccessToken()', function() {
    it('test check access token', function(done) {
      fbAuth.checkAccessToken("invalid token", function(err, response) {
        //   console.log(err.message);
          assert.equal(err != null, true);
          assert.equal(response == null, true);
          done();
      });
    });
  });
});
