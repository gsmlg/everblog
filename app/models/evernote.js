var path = require('path');
var _ = require('underscore');
var RSVP = require('rsvp');
var Promise = RSVP.Promise;
var DS = require('nedb');
var Evernote = require('evernote').Evernote;
var TOKEN = process.env.EVERNOTE_DEV_TOKEN;

var bookStore = new DS({
  filename: path.join(__dirname, '../../db', 'book_store.db'),
  autoload: true
});
bookStore.loadDatabase();

var noteStore = new DS({
  filename: path.join(__dirname, '../../db', 'note_store.db'),
  autoload: true
});
noteStore.loadDatabase();

var tagStore = new DS({
  filename: path.join(__dirname, '../../db', 'tag_store.db'),
  autoload: true
});
tagStore.loadDatabase();

var resourceStore = new DS({
  filename: path.join(__dirname, '../../db', 'resource_store.db'),
  autoload: true
});
resourceStore.loadDatabase();

var stores = exports.stores = {
    resource: resourceStore,
    notebook: bookStore,
    note: noteStore,
    tag: tagStore
};

_.each(stores, function(store, name) {
    name = name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();

    exports['find' + name] = function (attr) {
        return new Promise(function(resolve, reject) {
            store.find(attr, function(e, docs) {
                if (e) {
                    reject(e);
                } else {
                    resolve(docs);
                }
            });
        });
    };

    exports['findOne' + name] = function (attr) {
        return new Promise(function(resolve, reject) {
            store.findOne(attr, function(e, doc) {
                if (e) {
                    reject(e);
                } else {
                    resolve(doc);
                }
            });
        });
    };

    exports['insert' + name] = function (doc) {
        return new Promise(function(resolve, reject) {
            store.insert(doc, function(e, doc) {
                if (e) {
                    reject(e);
                } else {
                    resolve(doc);
                }
            });
        });
    };

    exports['update' + name] = function (doc) {
        return new Promise(function(resolve, reject) {
            store.update({guid: doc.guid}, doc, {multi: false, upsert: false}, function(e, n, doc) {
                if (e) {
                    reject(e);
                } else {
                    resolve(doc);
                }
            });
        });
    };

    exports['upsert' + name] = function (doc) {
        return new Promise(function(resolve, reject) {
            store.update({guid: doc.guid}, doc, {multi: false, upsert: true}, function(e, n, doc) {
                if (e) {
                    reject(e);
                } else {
                    resolve(doc);
                }
            });
        });
    };
});
