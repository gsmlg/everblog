var RSVP = require('rsvp');
var Promise = RSVP.Promise;
var NoteService = require('./app/lib/evernote');
var NoteDB = require('./app/models/evernote');
var is = require('util').inspect;

var ns = new NoteService();

var mapSeries = function (array, iterator, context) {
    var length = array.length
    var current = Promise.resolve()
    var results = new Array(length)
    for (var i = 0; i < length; ++i) {
        current = results[i] = current.then(function(i) {
            return iterator.call(context, array[i], i, array)
        }.bind(undefined, i))
    }
    return Promise.all(results)
};

var t1 = Date.now();
ns.listNotebooks().then(function(books) {
    var p1 = books.map(function(book){
        book._id = book.guid;

        var p2 = NoteDB.upsertNotebook(book).then(function(){
            console.log('Book: %s', book.name);
        });

        var p3 = ns.listNotesByNotebook(book.guid).then(function(data) {
            var notes = data.notes;
            var p4 = mapSeries(notes, function(note) {
                note._id = note.guid;
                return ns.getNote(note.guid, {
                    withContent: false,
                    withResourcesData: false,
                    withResourcesRecognition: false,
                    withResourcesAlternateData: false
                }).then(function (note) {
                    note._id = note.guid;
                    console.log('Note: %s', note.title);
                    return NoteDB.upsertNote(note);
                });
            });
            return RSVP.all(p4);
        });

        var p5 = ns.listTagsByNotebook(book.guid).then(function(tags) {
            var p6 = tags.map(function(tag) {
                tag._id = tag.guid;
                return NoteDB.upsertTag(tag);
            });
            return RSVP.all(p6);
        });

        return RSVP.all([p2, p3, p5]);
    });
    return RSVP.all(p1);
}).then(function(){
    console.log('Sync complete! Cost: %sms', Date.now() - t1);
}, function(e){
    console.error("Error : %s \n    %s", e, e.stack);
});
