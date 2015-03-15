var rsvp = require('rsvp');
var _ = require('underscore');
var async = require('async');
var Promise = rsvp.Promise;
var Evernote = require('evernote').Evernote;
var TOKEN = process.env.EVERNOTE_DEV_TOKEN;

function NoteService () {

    this.client = new Evernote.Client({
        token: TOKEN,
        serviceHost: 'app.yinxiang.com'
    });

    this.userStore = this.client.getNoteStore();
    this.noteStore = this.client.getNoteStore();
    return this;
}


NoteService.prototype.listNotebooks = function(){
    var that = this;
    return new Promise(function(resolve, reject){
        that.noteStore.listNotebooks(function(e, notebooks){
            if (e) {
                console.error(e);
                return reject(e);
            } else {
                return resolve(notebooks);
            }
        });
    });
};

NoteService.prototype.listNotesByNotebook = function(guid) {
    var that = this;
    var filter = new Evernote.NoteFilter();
    var resultSpec = new Evernote.NoteStore_findNotesMetadata_result();
    return new Promise(function(resolve, reject){
        filter.notebookGuid = guid;
        that.noteStore.findNotesMetadata(TOKEN, filter, 0, 9999, resultSpec, function(e, data){
            if (e) {
                console.error('%s %s', e, e.stack);
                return reject(e);
            } else {
                return resolve(data);
            }
        });
    });
};

NoteService.prototype.listTagsByNotebook = function(guid) {
    var that = this;
    return new Promise(function(resolve, reject){
        that.noteStore.listTagsByNotebook(TOKEN, guid, function(e, data){
            if (e) {
                console.error('%s %s', e, e.stack);
                return reject(e);
            } else {
                return resolve(data);
            }
        });
    });
};

NoteService.prototype.getNote = function getNote(guid, options) {
    var that = this;
    options = options || {
        withContent: false,
        withResourcesData: false,
        withResourcesRecognition: false,
        withResourcesAlternateData: false
    };
    return new Promise(function(resolve, reject){
        that.noteStore.getNote(TOKEN, guid,
            options.withContent,
            options.withResourcesData,
            options.withResourcesRecognition,
            options.withResourcesAlternateData,
            function(e, data){
            if (e) {
                console.error(e);
                return reject(e);
            } else {
                return resolve(data);
            }
        });
    });
};

NoteService.prototype.getTag = function getTag(guid) {
    var that = this;
    return new Promise(function(resolve, reject){
        that.noteStore.getTag(TOKEN, guid, function(e, data){
            if (e) {
                console.error(e);
                return reject(e);
            } else {
                return resolve(data);
            }
        });
    });
};


module.exports = NoteService;
