var express = require('express');
var evernote = require('./modules/evernote');
var local_settings = require('../local_settings').settings;
var request = require('request');
var router = express.Router();

var createNote = function(accessToken, lunchTime, url, callback){
    console.log("createNote accessToken:" + accessToken + ", lunchTime: " + lunchTime + ", url" + url);
    // TODO: set readonly
    var note = new evernote.Evernote.Note();
    // var note = new evernote.Evernote.Note({attributes: noteAttr});
    note.title = "API test1";
    note.content = '<?xml version="1.0" encoding="UTF-8"?>';
    note.content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
    note.content += '<en-note>LunchTimer voting time reminder <br/> ';
    note.content += url;
    note.content += '</en-note>';
    updateReminder(note, lunchTime);
    // TODO: set vote timae reminder & result time reminder
    var client = evernote.newClient(accessToken);
    var noteStore = client.getNoteStore();
    noteStore.createNote(note, function(err, createdNote) {
        if(callback){
            callback(err, createdNote);
        }
    });
};

var updateNote = function(accessToken, note, lunchTime, url, callback){
    updateReminder(note, lunchTime);
    var client = evernote.newClient(accessToken);
    var noteStore = client.getNoteStore();
    noteStore.updateNote(note, function(err, updatedNote) {
        if(callback){
            callback(err, updatedNote);
        }
    });    
};

var updateReminder = function(note, lunchTime){
    var now = (new Date()).getTime();
    var noteAttr = new evernote.Evernote.NoteAttributes({
        reminderOrder: now,
        reminderTime: now + 3600000
    });
    note.attributes = noteAttr;
};

router.get('/', function(req, res) {
    // this is called as a authentication callback
    var oauthToken = req.param("oauth_token");
    var oauthVerifier = req.param("oauth_verifier");
    // get from session
    var oauthTokenSecret = req.session.evernoteOAuthTokenSecret;
    if(!oauthToken || !oauthVerifier || !oauthTokenSecret){
        res.redirect("/");
        return;
    }
    var callback = function(error, oauthAccessToken, oauthAccessTokenSecret, results){
        // store accessToken in session
        req.session.evernoteAccessToken = oauthAccessToken;
        res.redirect("/");
    };
    evernote.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, callback);
});

router.get('/logout', function(req, res) {
    var accessToken = req.session.evernoteAccessToken;
    if(!accessToken){
        res.redirect("/");
        return;
    }
    var userStore = evernote.newClient(accessToken).getUserStore();
    // clear session
    delete req.session.evernoteOAuthTokenSecret;
    delete req.session.evernoteAccessToken;
    // call logout
    userStore.revokeLongSession(accessToken, function(){
        res.redirect("/");
    });
});

router.post('/reminder', function(req, res) {
    var accessToken = req.session.evernoteAccessToken;
    if(!accessToken){
        res.redirect("/");
        return;
    }
    var entry = req.body;
    var lunchTimerURL = entry.lunchTimerURL;
    var userId = entry.userId;
    // get selected group from DB
    // call api /api/group/{group._id}?inputToken={fb_token}
    request(lunchTimerURL + "api/group/" + entry.groupId + "?inputToken=" + entry.inputToken, function(error, getGroupRes, getGroupBody) {
        if(entry.votingTimeReminder){
            // enable reminder
            var group = JSON.parse(getGroupBody);
            var lunchTime = group.lunchTime;
            // check if a note GUID exists in user entry
            // e.g. group.evernote = {"{evernote_user_id}": "{note_GUID}"...}
            var createdCallback = function(err, createdNote){
                if(err){ 
                    res.redirect("/"); 
                }
                console.log("Successfully create a note");
                if(!group.evernote){ group.evernote = {}; }
                group.evernote[userId] = createdNote.guid;
                // update group DB with evernoteID + createdNote.guid
                request.put({
                    url: local_settings.CONTEXT_PATH + "/api/group", 
                    json: {
                        inputToken: entry.inputToken,
                        group: group
                    }
                }, function(error, putRes, body){
                    console.log("Successfully put the group");
                    res.redirect("/");                    
                });
            };
            if(group.evernote && group.evernote[userId]){
                // search & find note from user store
                var existingNoteGUID = group.evernote[userId];
                var note = NoteStore.find(accessToken, existingNoteGUID);
                if(note){
                    // just set reminder
                    updateNote(accessToken, note, lunchTime, lunchTimerURL, function(error, updatedNote){
                        if(err){ res.redirect("/"); }
                        res.redirect("/");
                    });
                }else{
                    createNote(accessToken, lunchTime, lunchTimerURL, createdCallback);
                }
            }else{
                // create a new note with reminder
                createNote(accessToken, lunchTime, lunchTimerURL, createdCallback);
            }
        }else{
            // TODO: disable reminder

        }
    });
});

module.exports = router;