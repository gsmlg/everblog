var rsvp = require('rsvp');
var Evernote = require('evernote').Evernote;
var Promise = rsvp.Promise;
var TOKEN = process.env['EVERNOTE_DEV_TOKEN'];

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
                return reject(e);
            } else {
                return resolve(notebooks);
            } 
        });
    });
};

exports.getNotesByNotebook = function(guid) {
    return new Promise(function(resolve, reject){
        noteStore.findNotesMetaData(TOKEN, filter, 0, 10, function(e, data){
            if (e) return reject(e);
            else return resolve(data);
        });
    });
};
