var path = require('path');
var Datastore = require('nedb');
var Promise = require('rsvp').Promise;
var store = new Datastore({
  filename: path.join(__dirname, 'books.db'),
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
  }
};



module.exports = Books;
