var path = require('path');
var express = require('express');
var http = require('http');
var config = require('./config');

var app = express();

app.use(express.static(__dirname + '/public'));
// app.use('/assets', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.render('index', {title: 'Home App'});
});

var hbs = require('express4-handlebars');
var views = path.join(__dirname, 'app', 'views')
app.set('views', views);
app.engine('hbs', hbs.__express);
app.set('view engine', 'hbs');
hbs.set('layout_dir', path.join(views, 'layout'));
hbs.set('partials_dir', path.join(views, 'partials'));
hbs.set('useLayout', false);

config(app);

var server = http.createServer(app);

var port = config.PORT;

server.listen(port, function(){
  console.log('Server start at %s', port);
});
