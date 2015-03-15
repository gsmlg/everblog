var path = require('path');
var _ = require('underscore');
var RSVP = require('rsvp');
var Promise = RSVP.Promise;
var DS = require('nedb');
var Evernote = require('evernote').Evernote;
var TOKEN = process.env.EVERNOTE_DEV_TOKEN;

var configStore = new DS({
  filename: path.join(__dirname, '../../db', 'config_store.db'),
  autoload: true
});
configStore.loadDatabase();exports.setAllowedBooks = function(books) {    return new Promise(function(resolve, reject){        configStore.insert({_id: 'books', notebooks: books}, function(err, books) {            if (err) {                reject(err);            } else {                resolve(books.notebooks);            }        });    });};exports.getAllowedBooks = function() {    return new Promise(function(resolve, reject){        configStore.findOne({_id: 'books'}, function(err, books) {            if (err) {                reject(err);            } else {                resolve(books.notebooks);            }        });    });};