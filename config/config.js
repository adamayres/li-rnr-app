'use strict';

var fs = require('fs');
var path = require('path');
var nconf = require('nconf');
var logger = require('winston');
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
if (!(typeof env === 'undefined')){
  configPaths.push(__dirname + '/env/all.json');
} else {
  logger.info("no env specified, not attempting to load env");
}

/**
 * Load config files specified by NODE_ENV arg or env (NODE_ENV=production OR --NODE_ENV=production)
 */
configPaths.push( __dirname + '/env/' + env + '.json');

/**
 * Load config for files specified by configs arg or env
 * (configs=../abc.json,foo.json OR --configs=../abc.json,foo.json)
 */
if (nconf.get('configs')) {
  configPaths = configPaths.concat(nconf.get('configs').split(','));
}

/**
 * Load config file for current user
 *
 * TODO: we probably want to remove this in favor of having the engineer specify the local config in the --configs arg
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
