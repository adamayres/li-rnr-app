'use strict';

var config = require('../../config/config');

exports.render = function(req, res) {
  res.render('index', {
    app: config.get('app')
  });
};