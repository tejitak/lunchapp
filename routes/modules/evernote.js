var moment = require('moment');
var momentTz = require('moment-timezone');
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

    _buildReminderNoteContent: function(groupName, lunchTime){
        var html = ['<?xml version="1.0" encoding="UTF-8"?>'];
        html.push('<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note>');
        html.push('<div style="background: #e6e6e6; color: #585957; font-size: 14px; line-height: 1.3;">');
        html.push('<div style="height: 40px;"> </div><div style="max-width: 600px;padding: 25px 0px; background-color: #fff;margin: 0 auto;box-shadow: 0 0px 5px rgba(0, 0, 0, 0.2); text-align: center;"><div style="margin: 0px 25px;padding-bottom: 15px;">');
        html.push('<img src="http://www.tejitak.com/lunch/img/logo/logo_64.png"></img>')
        html.push('<h1 style="color: #db6900;margin: 0;margin-top: 15px;font-size: 20px;font-weight: normal;">Lunch Timer Reminder</h1>');
        html.push('<p style="font-size: 16px;margin: 6px 0px;line-height: 1.4;">');
        html.push('This reminder is automatically created by LunchTimer for your group');
        html.push(' "<strong>');
        html.push(groupName);
        html.push('</strong>"</p></div><div style="margin: 0px 25px;font-size: 14px;color: #4d4b47;background-color: #e6f4f6;border: 1px solid #c1e8ec;padding: 0px 15px 8px;clear: both;">');
        html.push('<p style="margin: 8px 0;"><span style="font-weight: bold;">');
        html.push('Please vote for one by configured time');
        html.push(' "<strong>');
        html.push(lunchTime);
        html.push('</strong>"</span></p>');
        html.push('<p style="margin: 8px 0;"><a href="http://www.tejitak.com/lunch/" style="color: #db6900;">');
        html.push('Open Lunch Timer for a vote');
        html.push('</a></p></div></div><div style="height: 40px;"> </div></div>');
        html.push('</en-note>');
        return html.join("");
    },

    createReminderNote: function(accessToken, groupName, lunchTime, timezone, callback){
        // TODO: set readonly?
        var note = new Evernote.Note();
        note.title = "LunchTimer Voting Time Reminder";
        note.content = this._buildReminderNoteContent(groupName, lunchTime);
        this.updateReminder(note, lunchTime, timezone);
        var client = this.newClient(accessToken);
        var noteStore = client.getNoteStore();
        noteStore.createNote(note, function(err, createdNote) {
            if(callback){
                callback(err, createdNote);
            }
        });
    },

    updateReminderNote: function(accessToken, note, groupName, lunchTime, timezone, callback){
        this.updateReminder(note, lunchTime, timezone);
        var client = this.newClient(accessToken);
        var noteStore = client.getNoteStore();
        note.content = this._buildReminderNoteContent(groupName, lunchTime);
        noteStore.updateNote(note, function(err, updatedNote) {
            if(callback){
                callback(err, updatedNote);
            }
        });
    },

    updateReminder: function(note, lunchTime, timezone){
        var now = target = (new Date()).getTime();
        var diff = (moment.tz(lunchTime, "HH:mm", timezone)).diff(moment());
        if(diff >= 0){
            target = now + diff - 600000/*10minutes*/;
        }else{
            // set next day's time 24 hours (1000 * 60 * 60 * 24) + diff - 10 minutes
            target = now + (86400000 + diff - 600000/*10 minutes*/);
        }
        var noteAttr = new Evernote.NoteAttributes({
            reminderOrder: now,
            reminderTime: target
        });
        note.attributes = noteAttr;
    },

    createLogNote: function(accessToken, title, imageURL, callback){
        var note = new Evernote.Note();
        note.title = title;

        var nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
        nBody += "<en-note>";
        nBody += '<img src="' + imageURL + '"></img>';
        nBody += "</en-note>";
        note.content = nBody;

        var client = this.newClient(accessToken);
        var noteStore = client.getNoteStore();
        noteStore.createNote(note, function(err, createdNote) {
            if(err) {
                console.log("createLogNote: err" + err);
            }
            if (callback){
                callback(err, createdNote);
            }
        });
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
    },

    configureNextEvernoteReminder: function(group){
        // configure next day's reminder if evernote entires are eixst in the group
        var that = this;
        if(group.evernote){
            for(var i=0, len=group.evernote.length; i<len; i++){
                var entry = group.evernote[i], guid = entry.guid, accessToken = entry.accessToken;
                this.find(accessToken, guid, (function(accessToken){
                    return function(err, existingNote){
                        if(existingNote){
                            // set next day's lunch time
                            that.updateReminderNote(accessToken, existingNote, group.name, group.lunchTime, group.timezone);
                        }
                    }
                })(accessToken));
            }
        }
    }
};

module.exports = evernote;
