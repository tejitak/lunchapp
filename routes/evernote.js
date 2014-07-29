var express = require('express');
var evernote = require('./modules/evernote');
var resourceBundle = require('./modules/resourceBundle');
var request = require('request');
var router = express.Router();
var models = require('../models');
var Token = models.Token;

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
    var userId = req.param("userId");
    var callback = function(error, oauthAccessToken, oauthAccessTokenSecret, results){
        // save accessToken to DB
        Token.updateEntry({userId: userId, evernoteAccessToken: oauthAccessToken}, function(){
            res.redirect("/");
        });
    };
    evernote.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, callback);
});

router.get('/user', function(req, res) {
    // get accessToken from token DB
    Token.getEvernoteAccessToken(req.param("userId"), function(accessToken){
        req.session.evernote = {};
        res.contentType('application/json');
        if(accessToken){
            // store accessToken in session
            req.session.evernote.accessToken = accessToken;
            evernote.getUser(accessToken, function(err, user){
                if(err){
                    // remove entry from DB
                    delete req.session.evernote.accessToken;
                    Token.removeEntryByEvernoteAccessToken(accessToken, function(err){
                        req.session.save(function(){
                            res.send('{"error":  true}');
                            return;
                        });
                    });
                }
                // user: {id: xx, username: "xxx", ...}
                req.session.save(function(){ res.send(user); });
            });
        }else{
            req.session.save(function(){ res.send('{}') });
        }
    });        
});

router.get('/logout', function(req, res) {
    var accessToken = req.session.evernote && req.session.evernote.accessToken;
    if(!accessToken){
        console.log("invalid access token");
        res.redirect("/");
        return;
    }
    var userStore = evernote.newClient(accessToken).getUserStore();
    // clear session
    delete req.session.evernote;
    // remove entry from DB
    Token.removeEntryByEvernoteAccessToken(accessToken, function(err){
        // call logout
        userStore.revokeLongSession(accessToken, function(){
            res.redirect("/");
        });        
    });
});

router.post('/reminder', function(req, res) {
    var labels = resourceBundle.getLabels(req);
    var accessToken = req.session.evernote && req.session.evernote.accessToken;
    if(!accessToken){
        console.log("invalid access token");
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
                if(error){
                    console.log("updateGroup callback");
                    console.log(error);
                    res.redirect("/");
                    return;
                }
                res.redirect("/");
            });
        };
        if(enableVotingTimeReminder){
            // enable reminder
            // check if a note GUID exists in user entry
            // e.g. group.evernote = [{userId: "{facebook_user_id}", guid: "{note_GUID}"}, ...]
            var createdCallback = function(err, createdNote){
                if(err){
                    console.log("created callback");
                    console.log(err);
                    res.redirect("/");
                    return;
                }
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
                    // if(err){ 
                    //     res.redirect("/");
                    //     return;
                    // }
                    if(existingNote){
                        // just set reminder
                        evernote.updateReminderNote(accessToken, existingNote, group.name, group.lunchTime, group.timezone, labels, function(error, updatedNote){
                            if(err){
                                console.log("updateReminderNote callback");
                                console.log(err);
                                res.redirect("/");
                                return;
                            }
                            res.redirect("/");
                        });
                    }else{
                        // remove the entry from list when the association is stored in DB but the note maybe
                        group.evernote.splice(registeredNoteIndex, 1);
                        evernote.createReminderNote(accessToken, group.name, group.lunchTime, group.timezone, labels, createdCallback);
                    }
                };
                evernote.find(accessToken, group.evernote[registeredNoteIndex].guid, findCallback);
            }else{
                // create a new note with reminder
                evernote.createReminderNote(accessToken, group.name, group.lunchTime, group.timezone, labels, createdCallback);
            }
        }else if(registeredNoteIndex >= 0){
            // disable reminder and remove entry from DB
            var deletedCallback = function(err, note){
                if(err){
                    console.log("deletedCallback");
                    console.log(err);
                }
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