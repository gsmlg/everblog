var path = require('path');
var Datastore = require('nedb');
var _ = require('underscore');
var Promise = require('rsvp').Promise;
var store = new Datastore({
  filename: path.join(__dirname, '../../db', 'books.db'),
  autoload: true
});
store.loadDatabase();

var Books = {
  store: store,
  all: function(criteria) {
    return new Promise(function(resolve, reject){
      store.find(criteria, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  create: function(data) {
    return new Promise(function(resolve, reject){
      store.insert(data, function(err, newData){
        if (err) {
          reject(err);
        } else {
          resolve(newData);
        }
      });
    });
  },
  update: function(id, data) {
    return new Promise(function(resolve, reject){
      store.update({_id: id}, data, {}, function(err){
        if (err) {
          reject(err);
        } else {
          store.findOne({_id: id}, function(err, newData) {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      });
    });
  },
  remove: function(id) {
    return new Promise(function(resolve, reject){
      store.remove({_id: id}, data, {}, function(err, numRemoved){
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    });
  }
};



module.exports = Books;
