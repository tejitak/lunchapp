var request= require('request');
var url = require('url');

var FACEBOOK_API_PATH = 'graph.facebook.com';

var access_token;
var params = {
    host: FACEBOOK_API_PATH,
    pathname: '/oauth/access_token',
    protocol: 'https',
    query: {
        // read from _apikey.json and set with init
        // 'client_id': '1437481033176694',
        // 'client_secret': '',
        'grant_type': 'client_credentials'
    }
};

var updateAccessToken = function(callback){
    var urlStr = url.format(params);
    request(urlStr, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            response.setEncoding('utf8');
            access_token = body.split('=')[1];
        } else {
            console.log('error: ' + response);
            console.log(body);
        }
        if (callback) {
            callback();
        }
    });
};

var fbAuth = {

    init: function(clientId, clientSecret, callback){
        if(clientSecret){
            params.query['client_id'] = clientId;
            params.query['client_secret'] = clientSecret;
        }
        updateAccessToken(callback);
    },

    checkAccessToken: function(inputToken, callback){
        var params = {
            host: FACEBOOK_API_PATH,
            pathname: '/debug_token',
            protocol: 'https',
            query: {
                'input_token': inputToken,
                'access_token': access_token
            }
        };
        var urlStr = url.format(params);
        request(urlStr, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                response.setEncoding('utf8');
                var resJson = JSON.parse(body);
                if (!resJson.data || !resJson.data.is_valid) {
                    var invalidAccessError = new Error('Invalid access token');
                    callback(invalidAccessError, null);
                    return;
                };
                if (callback){
                    callback(null, resJson);
                }
            } else {
                console.log('error: ' + response.statusCode);
                console.log(body);
            }
        });
    }
};

module.exports = fbAuth;
