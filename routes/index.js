var express = require('express');
var templates = require('./modules/templates');
var resourceBundle = require('./modules/resourceBundle');
var local_settings = require('../local_settings').settings;
var evernote = require('./modules/evernote');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var labels = resourceBundle.getLabels(req);
    res.render('index', {
        title: labels.main_title,
        templates: templates(req),
        config: local_settings,
        labels: labels
    });
});

router.get('/getting-started', function(req, res) {
    var labels = resourceBundle.getLabels(req);
    res.render('getting-started', {
        title: labels.gettingStarted_title,
        templates: templates(req),
        config: local_settings,
        labels: labels
    });
});

router.get('/evernote', function(req, res) {
    var oauthToken = req.param("oauth_token");
    var oauthVerifier = req.param("oauth_verifier");
    // TODO: get from session
    var oauthTokenSecret = evernote._client.oauthTokenSecret;
    var callback = function(error, oauthAccessToken, oauthAccessTokenSecret, results){
        // TODO: set reminder
        var note = new evernote.Evernote.Note();
        note.title = "API test";
        note.content = '<?xml version="1.0" encoding="UTF-8"?>';
        note.content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
        note.content += '<en-note>Here is the Evernote logo:<br/>';
        note.content += '</en-note>';
        var client = evernote.newClient(oauthAccessToken);
        var noteStore = client.getNoteStore();
        noteStore.createNote(note, function(err, createdNote) {
            if(err){
                res.redirect("/");
            }else{
                console.log("Successfully created a new note with GUID: " + createdNote.guid);
                res.redirect("/");
            }
        });
    };
    evernote.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, callback);
});

module.exports = router;
