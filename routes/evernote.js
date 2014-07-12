var express = require('express');
var evernote = require('./modules/evernote');
var request = require('request');
var router = express.Router();

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
        var group = JSON.parse(getGroupBody);
        var registeredNoteIndex = evernote.indexOfRegisteredNote(group, userId);
        console.log("registeredNoteIndex");
        console.log(registeredNoteIndex);
        var updateGroup = function(group){
            request.put({
                url: lunchTimerURL + "api/group", 
                json: {
                    inputToken: entry.inputToken,
                    group: group
                }
            }, function(error, putRes, body){
                console.log("Successfully put the group");
                console.log(body);
                res.redirect("/");                    
            });
        };
        if(entry.votingTimeReminder){
            // enable reminder
            var lunchTime = group.lunchTime;
            // check if a note GUID exists in user entry
            // e.g. group.evernote = [{userId: "{evernote_user_id}", guid: "{note_GUID}"}, ...]
            var createdCallback = function(err, createdNote){
                if(err){ res.redirect("/");  }
                group.evernote.push({userId: userId, guid: createdNote.guid});
                // update group DB with evernoteID + createdNote.guid
                updateGroup(group);
            };
            if(registeredNoteIndex >= 0){
                // search & find note from user store
                var existingNote = evernote.find(accessToken, group.evernote[registeredNoteIndex].guid);
                console.log("existingNote");
                console.log(existingNote);
                if(existingNote){
                    // just set reminder
                    evernote.updateNote(accessToken, existingNote, lunchTime, lunchTimerURL, function(error, updatedNote){
                        if(err){ res.redirect("/"); }
                        res.redirect("/");
                    });
                }else{
                    // remove the entry from list when the association is stored in DB but the note maybe
                    group.evernote.splice(registeredNoteIndex, 1);
                    evernote.createNote(accessToken, lunchTime, lunchTimerURL, createdCallback);
                }
            }else{
                // create a new note with reminder
                evernote.createNote(accessToken, lunchTime, lunchTimerURL, createdCallback);
            }
        }else if(registeredNoteIndex >= 0){
            // remove from list in DB
            // TODO: disable reminder
            var deletedCallback = function(){
                group.evernote.splice(registeredNoteIndex, 1);
                // update group DB with evernoteID + createdNote.guid
                updateGroup(group);
            };
            evernote.removeReminder(accessToken, group.evernote[registeredNoteIndex].guid, deletedCallback);
        }
    });
});

module.exports = router;