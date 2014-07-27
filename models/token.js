var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    evernoteAccessToken: {
        type: String
    }
});

tokenSchema.statics.findByUserId = function(id, completed) {
    Token.find({'userId': id}).exec(completed);
};

var getEvernoteAccessToken = tokenSchema.statics.getEvernoteAccessToken = function(id, completed) {
    Token.find({'userId': id}).exec(function(err, items) {
        var accessToken = (items && items[0] && items[0].evernoteAccessToken) || null;
        completed(accessToken);
    });
};

var createEntry = tokenSchema.statics.createEntry = function(entry, completed) {
    // {
    //     "userId": userId,
    //     "evernoteAccessToken": evernoteAccessToken
    // }
    Token.create(entry, completed);
};

tokenSchema.statics.updateEntry = function(entry, completed) {
    // {
    //     "userId": userId,
    //     "evernoteAccessToken": evernoteAccessToken
    // }
    getEvernoteAccessToken(entry.userId, function(evernoteAccessToken){
        if(evernoteAccessToken){
            Token.update({'userId': entry.userId}, entry, {upsert: true}, completed);
        }else{
            Token.create(entry, completed);
        }
    });
};

tokenSchema.statics.removeEntry = function(userId, completed) {
    Token.remove({'userId': userId}, function(err, num) {
        if (err) console.log(err);
        if (completed) {
            completed(err);
        }
    });
};

var Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
