'use strict';

var engines = require('consolidate');
var config = require('../config/config');
var connectLr = require('connect-livereload');
var express = require('express');
var app = express();

module.exports = function() {
  /**
   * Add livereload
   *
   * TODO(adamayres): Make the livereload conditional of development mode
   */
  app.use(connectLr());

  /**
   * Serve the .tmp folder
   */
  app.use(express.static('./.tmp'));

  /**
   * Use the underscore library for templating
   * and setup the views folder as the base for
   * the server side templates.
   */
  app.engine('html', engines.lodash);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');

  /**
   * Handle the root request
   */
  app.get('/', function (req, res){
    res.render('index', {
      app: config.get('app')
    });
  });

  app.listen(config.get('port'));
  console.log('Listening on port ' + config.get('port'));
  return app;
};