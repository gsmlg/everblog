var books = require('./books');
var rsvp = require('rsvp');
var Evernote = require('evernote').Evernote;

var client = new Evernote.Client({
    token: TOKEN,
    serviceHost: 'app.yinxiang.com'
});

var userStore = client.getNoteStore();
var noteStore = client.getNoteStore();

var Promise = rsvp.Promise;

var getNotebooks = function(){
    return new Promise(function(resolve, reject){
        noteStore.listNotebooks(function(e, notebooks){
            if (e) return reject(e);
            else return resolve(notebooks);
        });
    });
};

module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', {title: 'Home App'});
  });

  app.get('/notebooks', function(req, res){
    getNotebooks().then(function(books){
        res.json(books);
    });
  });

  app.use('/books', books);
};
