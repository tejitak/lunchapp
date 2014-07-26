var express = require('express');
var evernote = require('./modules/evernote');
var resourceBundle = require('./modules/resourceBundle');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {
    // this is called as a authentication callback
    var oauthToken = req.param("oauth_token");
    var oauthVerifier = req.param("oauth_verifier");
    // get from session
    var oauthTokenSecret = req.session.evernote && req.session.evernote.authTokenSecret;
    if(!oauthToken || !oauthVerifier || !oauthTokenSecret){
        res.redirect("/");
        return;
    }
    var callback = function(error, oauthAccessToken, oauthAccessTokenSecret, results){
        // store accessToken in session
        req.session.evernote.accessToken = oauthAccessToken;
        evernote.getUser(oauthAccessToken, function(err, user){
            if(err){ res.redirect("/"); }
            // user: {id: xx, username: "xxx", ...}
            req.session.evernote.user = user;
            res.redirect("/");    
        });
    };
    evernote.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, callback);
});

router.get('/logout', function(req, res) {
    var accessToken = req.session.evernote && req.session.evernote.accessToken;
    if(!accessToken){
        res.redirect("/");
        return;
    }
    var userStore = evernote.newClient(accessToken).getUserStore();
    // clear session
    delete req.session.evernote;
    // call logout
    userStore.revokeLongSession(accessToken, function(){
        res.redirect("/");
    });
});

router.post('/reminder', function(req, res) {
    var accessToken = req.session.evernote && req.session.evernote.accessToken;
    if(!accessToken){
        res.redirect("/");
        return;
    }
    var entry = req.body;
    var lunchTimerURL = entry.lunchTimerURL;
    var userId = entry.userId;
    var groupId = entry.groupId;
    var enableVotingTimeReminder = entry.votingTimeReminder;
    var fbInputToken = entry.inputToken;
    // get selected group from DB
    // call api /api/group/{group._id}?inputToken={fb_token}
    // the reminder will be set repeatedly at showing first result time in api.js
    request(lunchTimerURL + "api/group/" + groupId + "?inputToken=" + fbInputToken, function(error, getGroupRes, getGroupBody) {
        var group = JSON.parse(getGroupBody);
        var registeredNoteIndex = evernote.indexOfRegisteredNote(group, userId);
        var updateGroup = function(group){
            request.put({
                url: lunchTimerURL + "api/group", 
                json: {
                    inputToken: fbInputToken,
                    group: group
                }
            }, function(error, putRes, body){
                res.redirect("/");                    
            });
        };
        if(enableVotingTimeReminder){
            // enable reminder
            // check if a note GUID exists in user entry
            // e.g. group.evernote = [{userId: "{facebook_user_id}", guid: "{note_GUID}"}, ...]
            var createdCallback = function(err, createdNote){
                if(err){ res.redirect("/"); }
                group.evernote.push({
                    userId: userId,
                    guid: createdNote.guid,
                    accessToken: accessToken
                });
                // update group DB with evernoteID + createdNote.guid
                updateGroup(group);
            };
            if(registeredNoteIndex >= 0){
                // search & find note from user store
                var findCallback = function(err, existingNote){
                    if(err){ res.redirect("/"); }
                    if(existingNote){
                        // just set reminder
                        evernote.updateReminderNote(accessToken, existingNote, group.name, group.lunchTime, group.timezone, function(error, updatedNote){
                            if(err){ res.redirect("/"); }
                            res.redirect("/");
                        });
                    }else{
                        // remove the entry from list when the association is stored in DB but the note maybe
                        group.evernote.splice(registeredNoteIndex, 1);
                        evernote.createReminderNote(accessToken, group.name, group.lunchTime, group.timezone, createdCallback);
                    }
                };
                evernote.find(accessToken, group.evernote[registeredNoteIndex].guid, findCallback);
            }else{
                // create a new note with reminder
                evernote.createReminderNote(accessToken, group.name, group.lunchTime, group.timezone, createdCallback);
            }
        }else if(registeredNoteIndex >= 0){
            // disable reminder and remove entry from DB
            var deletedCallback = function(err, note){
                if(err){ res.redirect("/"); }
                group.evernote.splice(registeredNoteIndex, 1);
                // update group DB with evernoteID + createdNote.guid
                updateGroup(group);
            };
            evernote.removeReminder(accessToken, group.evernote[registeredNoteIndex].guid, deletedCallback);
        }
    });
});

router.post('/log', function(req, res) {
    var labels = resourceBundle.getLabels(req);
    var accessToken = req.session.evernote && req.session.evernote.accessToken;
    var log = req.body;
    var title = log.title;
    var imageURL = log.imageURL;

    evernote.createLogNote(accessToken, title, imageURL, labels, function(err, createdNote) {
        if (err) {
            console.log("/log create evernote:err " + err);
            res.send('{"error": "' + err + '"}');
            return;
        }
        res.send(createdNote);
    });
})

module.exports = router;