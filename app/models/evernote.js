var path = require('path');
var _ = require('underscore');
var rsvp = require('rsvp');
var DS = require('nedb');
var Evernote = require('evernote').Evernote;
var TOKEN = process.env.EVERNOTE_DEV_TOKEN;

var bookStore = new DS({
  filename: path.join(__dirname, '../../db', 'book_store.db'),
  autoload: true
});
bookStore.loadDatabase();

var noteStoe = new DS({
  filename: path.join(__dirname, '../../db', 'note_store.db'),
  autoload: true
});
noteStoe.loadDatabase();

var tagStore = new DS({
  filename: path.join(__dirname, '../../db', 'tag_store.db'),
  autoload: true
});
tagStore.loadDatabase();
