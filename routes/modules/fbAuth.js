var request= require('request');
var url = require('url');

var FACEBOOK_API_PATH = 'graph.facebook.com';

var access_token;
var params = {
    host: FACEBOOK_API_PATH,
    pathname: '/oauth/access_token',
    protocol: 'https',
    query: {
        'client_id': '1437481033176694',
        // read from _apikey.json and set with setClientSecret
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
            console.log('error: ' + response.statusCode);
            console.log(body);
        }
        if (callback) {
            callback();
        }
    });
};

var fbAuth = {

    setClientSecret: function(clientSecret, callback){
        if(clientSecret){
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
                    throw new Error('Invalid access token');
                };
                if (callback){
                    callback(resJson);
                }
            } else {
                console.log('error: ' + response.statusCode);
                console.log(body);
            }
        });
    }
};

module.exports = fbAuth;
