var evernote = require('./evernote');
var isProd = require('../../environment').production;

module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', {title: 'Home App', production: isProd});
  });

  app.use('/notebooks', evernote);

};
