'use strict';

var koa = require('koa');
var serve = require('koa-static');
var views = require('koa-views');
var config = require('../config/config');
var app = koa();

module.exports = function() {
  app.use(serve('./.tmp'));

  app.use(views('./server/views', 'html', {
    html: 'underscore'
  }));

  app.use(function* (next) {
    yield this.render('index.html', config);
  });

  app.listen(config.port);
  console.log('Listening on port 3000');
  return app;
};