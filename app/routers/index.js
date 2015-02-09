var books = require('./books');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', {title: 'Home App'});
  });

  app.use('/books', books);
}
