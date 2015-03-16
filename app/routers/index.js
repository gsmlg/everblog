var evernote = require('./evernote');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', {title: 'Home App', production: process.env.NODE_ENV === 'production'});
  });

  app.use('/notebooks', evernote);

};
