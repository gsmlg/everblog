var RSVP = require('rsvp');
var NoteService = require('./app/lib/evernote');
var NoteDB = require('./app/models/evernote');
var is = require('util').inspect;

var ns = new NoteService();

var t1 = Date.now();
ns.listNotebooks().then(function(books) {
    console.log('Books: %s', books);
    var p1 = books.map(function(book){
        console.log('Book: %s', is(book));
        book._id = book.guid;

        var p2 = NoteDB.upsertNotebook(book);

        var p3 = ns.listNotesByNotebook(book.guid).then(function(data) {
            var p4 = data.notes.map(function(note) {
                note._id = note.guid;
                return ns.getNote(note.guid, {
                    withContent: false,
                    withResourcesData: false,
                    withResourcesRecognition: false,
                    withResourcesAlternateData: false
                }).then(function (note) {
                    note._id = note.guid;
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
