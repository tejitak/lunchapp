var Evernote = require('evernote').Evernote;

var evernote = {

    Evernote: null,
    _client: null,

    init: function(consumerKey, consumerSecret, sandbox){
        this.Evernote = Evernote;
        this._client = new Evernote.Client({
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            sandbox: sandbox
        });
    },

    newClient: function(oauthAccessToken){
        return new Evernote.Client({token: oauthAccessToken, sandbox: this._client.sandbox});
    },

    authenticate: function(req, res){
        var c = this._client;
        var callbackURL = req.param("callback");
        c.getRequestToken(callbackURL, function(error, oauthToken, oauthTokenSecret, results){
            if (error){
                return res.send("Error getting OAuth request token : " + error, 500);
            }
            // store token and secret in session
            req.session.evernote = {authTokenSecret: oauthTokenSecret};
            res.redirect(c.getAuthorizeUrl(oauthToken));
        });
    },

    getAccessToken: function(oauthToken, oauthTokenSecret, oauthVerifier, callback){
        this._client.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, callback);
    },

    getUser: function(accessToken, callback){
        var client = this.newClient(accessToken);
        var userStore = client.getUserStore();
        userStore.getUser(accessToken, callback);
    },

    createNote: function(accessToken, group, url, callback){
        // TODO: set readonly?
        var note = new Evernote.Note();
        note.title = "LunchTimer Voting Time Reminder";
        note.content = '<?xml version="1.0" encoding="UTF-8"?>';
        note.content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
        note.content += '<en-note>This reminder is automatically created by LunchTimer for your group "<strong>' + group.name + '</strong>"<br/> Please vote for one by configured time "<strong>' + group.lunchTime + '</strong>"<br/>';
        note.content += '<a href="' + url + '">' + url + '</a>';
        note.content += '</en-note>';
        this.updateReminder(note, group.lunchTime);
        var client = this.newClient(accessToken);
        var noteStore = client.getNoteStore();
        noteStore.createNote(note, function(err, createdNote) {
            if(callback){
                callback(err, createdNote);
            }
        });
    },

    updateNote: function(accessToken, note, group, url, callback){
        this.updateReminder(note, group.lunchTime);
        var client = this.newClient(accessToken);
        var noteStore = client.getNoteStore();
        noteStore.updateNote(note, function(err, updatedNote) {
            if(callback){
                callback(err, updatedNote);
            }
        });
    },

    updateReminder: function(note, lunchTime){
        var now = (new Date()).getTime();
        var noteAttr = new Evernote.NoteAttributes({
            reminderOrder: now,
            reminderTime: now + 3600000
        });
        note.attributes = noteAttr;
    },

    indexOfRegisteredNote: function(group, userId){
        if(!group.evernote){ group.evernote = []; }
        for(var i=0, len=group.evernote.length; i<len; i++){
            var obj = group.evernote[i];
            if(obj.userId === userId){
                return i;
            }
        }
        return -1;
    },

    find: function(accessToken, guid, callback){
        // TODO: search by guid
        var client = this.newClient(accessToken);
        var noteStore = client.getNoteStore();
        var filter = new Evernote.NoteFilter({notebookGuid: guid});
        var resultSpec = new Evernote.NotesMetadataResultSpec({includeTitle: true, includeNotebookGuid: true});
        // noteStore.findNotesMetadata(accessToken, filter, 0, 10, resultSpec, function(notes){});
        var note = null;
        noteStore.getNote(accessToken, guid, true, true, false, false, function(err, note){
            if(callback){
                callback(err, note);
            }
        });
    },

    removeReminder: function(accessToken, guid, callback){
        var client = this.newClient(accessToken);
        var _callback = function(err, note){
            if(note && note.attributes){
                delete note.attributes.reminderOrder;
                delete note.attributes.reminderTime;            
            }
            var noteStore = client.getNoteStore();
            noteStore.updateNote(note, function(err, updatedNote) {
                if(callback){
                    callback(err, updatedNote);
                }                
            });
        };
        this.find(accessToken, guid, _callback);
    }
};

module.exports = evernote;
