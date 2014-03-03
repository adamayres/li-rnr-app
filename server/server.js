'use strict';

var koa = require('koa');
var serve = require('koa-static');
var app = koa();

module.exports = function() {
  app.use(serve('./server/views'));
  app.use(serve('./.tmp'));
  app.listen(3000);
  console.log('Listening on port 3000');
  return app;
};