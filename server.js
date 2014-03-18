'use strict';

var engines = require('consolidate');
var config = require('./config/config');
var connectLr = require('connect-livereload');
var express = require('express');
//var https = require('https');
var http = require('http');
var app = express();


if (config.get('NODE_ENV') === 'development') {
  app.use(connectLr());
}

app.use(express.static('./.tmp'));
app.use(express.logger());

app.engine('html', engines.lodash);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

/**
 * Add the routes
 */
require('./app/routes/index')(app);

http.createServer(app).listen(config.get('port'), function() {
  console.log('Listening on port %d', config.get('port'));
});

//https.createServer({}, app).listen(443);

module.exports = app;

