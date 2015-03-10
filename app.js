var path = require('path');
var express = require('express');
var http = require('http');
var config = require('./config');

var app = express();

app.use(express.static(__dirname + '/public'));
// app.use('/assets', express.static(__dirname + '/bower_components'));

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var hbs = require('express4-handlebars');
var views = path.join(__dirname, 'app', 'views');
app.set('views', views);
app.engine('hbs', hbs.__express);
app.set('view engine', 'hbs');
hbs.set('layout_dir', path.join(views, 'layout'));
hbs.set('partials_dir', path.join(views, 'partials'));
hbs.set('useLayout', false);

var router = path.join(__dirname, 'app', 'routers');
require(router)(app);

config(app);

var server = http.createServer(app);

var port = config.PORT;
var host = config.HOST || '0.0.0.0';

server.listen(port, host, function(){
  console.log('Server start at %s:%s', host, port);
});
