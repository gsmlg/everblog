var rsvp = require('rsvp');
var Evernote = require('evernote').Evernote;
var Promise = rsvp.Promise;
var TOKEN = process.env.EVERNOTE_DEV_TOKEN;
var async = require('async');

var client = new Evernote.Client({
    token: TOKEN,
    serviceHost: 'app.yinxiang.com'
});

var userStore = client.getNoteStore();
var noteStore = client.getNoteStore();

exports.userStore = userStore;
exports.noteStore = noteStore;

exports.getNotebooks = function(){
    return new Promise(function(resolve, reject){
        noteStore.listNotebooks(function(e, notebooks){
            if (e) {
                console.error(e);
                return reject(e);
            } else {
                return resolve(notebooks);
            }
        });
    });
};

exports.getNotesByNotebook = function(guid) {
    var ins = require('util').inspect;
    var filter = new Evernote.NoteFilter();
    return new Promise(function(resolve, reject){
        filter.notebookGuid = guid;
        var resultSpec = new Evernote.NoteStore_findNotesMetadata_result();
        noteStore.findNotesMetadata(TOKEN, filter, 0, 10, resultSpec, function(e, data){
            if (e) {
                console.error('%s %s', e, e.stack);
                return reject(e);
            } else {
                return async.map(data.notes, function(note, cb){
                    noteStore.getNote(TOKEN, note.guid, false, false, false, false, cb);
                }, function(e, notes){
                    if (e) {
                        console.error('%s %s', e, e.stack);
                        return reject(e);
                    } else {
                        data.notes = notes;
                        resolve(data);
                    }
                });
            }
        });
    });
};

exports.getNote = getNote;

function getNote(guid) {
    return new Promise(function(resolve, reject){
        noteStore.getNote(TOKEN, guid, true, true, true, true, function(e, data){
            if (e) {
                console.error(e);
                return reject(e);
            } else {
                return resolve(data);
            }
        });
    });
}
