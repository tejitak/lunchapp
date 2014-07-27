var mongoose = require('mongoose');
var Group = require('./group');
var Token = require('./token');

module.exports.init = function(url, db) {
    // if you uses multiple connection, use createConnection()
    mongoose.connect(url + '/' + db);
}

module.exports.destroy = function(completed) {
    mongoose.disconnect(completed);
}

module.exports.Group = Group;
module.exports.Token = Token;
