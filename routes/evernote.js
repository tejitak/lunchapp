var express = require('express');
var evernote = require('./modules/evernote');
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
    // TODO: set vote time reminder & result time reminder
    var entry = req.body;
    var votingTimeReminder = entry.votingTimeReminder;
    var resultTimeReminder = entry.resultTimeReminder;

    var now = (new Date()).getTime();
    var noteAttr = new evernote.Evernote.NoteAttributes({
        reminderOrder: now,
        reminderTime: now + 3600000
    });
    var note = new evernote.Evernote.Note({attributes: noteAttr});
    note.title = "API test1";
    note.content = '<?xml version="1.0" encoding="UTF-8"?>';
    note.content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
    note.content += '<en-note>LunchTimer voting time reminder <br/> ';
    note.content += entry.url;
    note.content += '</en-note>';

    var client = evernote.newClient(accessToken);
    var noteStore = client.getNoteStore();
    noteStore.createNote(note, function(err, createdNote) {
        if(err){
            res.redirect("/");
        }else{
            console.log("Successfully created a new note with GUID: " + createdNote.guid);
            res.redirect("/");
        }
    });
});

module.exports = router;