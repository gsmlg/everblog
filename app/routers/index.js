var books = require('./books');
var evernote = require('./evernote');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', {title: 'Home App'});
  });

  app.use('/notebooks', evernote);
  app.use('/books', books);
 
};
