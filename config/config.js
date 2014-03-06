'use strict';

var fs = require('fs');
var path = require('path');
var nconf = require('nconf');
var logger = require('winston');
var util = require('util');
var merge = require('merge');
var userName = process.env.USER || process.env.USERNAME || process.env.LOGNAME;
var configPaths = [];
var configValues = [];
var env;

/**
 * Setup config based on args and env values.
 */
nconf
  .argv()
  .env();

env = nconf.get('NODE_ENV');

/**
 * Load defaults in /config/env/all.json
 */
configPaths.push(__dirname + '/env/all.json')

/**
 * Load config files specified by NODE_ENV arg or env (NODE_ENV=production OR --NODE_ENV=production)
 */
configPaths.push( __dirname + '/env/' + env + '.json');

/**
 * Load config for files specified by configs arg or env (configs=../abc.json,foo.json OR --configs=../abc.json,foo.json)
 */
if (nconf.get('configs')) {
  configPaths.contact(nconf.get('configs').split(','));
}

/**
 * Load config file for current user
 */
configPaths.push(__dirname + '/local/local.' + userName + '.json');

for (var i = 0; i < configPaths.length; i++) {
  var resolvedPath = path.resolve(configPaths[i]);
  logger.info('Attempt to load config from [%s].', resolvedPath);
  if (fs.existsSync(resolvedPath)) {
    var file = fs.readFileSync(resolvedPath);
    configValues.push(JSON.parse(file));
    logger.info('Loading config from [%s].', resolvedPath);
  }
}

nconf.defaults(merge.apply(this, configValues));

module.exports = nconf;
