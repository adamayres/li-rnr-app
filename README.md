[![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> Lithium RnR Application

### Install

1. Install [NodeJs](http://nodejs.org/download/)
2. Install git and setup github using these [instructions](https://help.github.com/articles/set-up-git)
3. Start a new terminal and run the following commands:

```bash
# Install gulp globally
npm install -g gulp;

# Create and go into folder where you want to store the Lithium code
mkdir lia; cd lia

# Clone the li-rnr-app branch
git clone https://github.com/lithiumtech/li-rnr-app.git

# Install the npm dependencies in li-rnr-app
cd li-rnr-app; npm install;

# Run the app using the default command of gulp
gulp
```

### Config

Configs are loading using [nconf](https://github.com/flatiron/nconf). The config store is built up using a hierarchical
structure loaded in the following order where a latter definition will override a former one:

* Command line arguments. Example: `gulp app --NODE_ENV=production`
* Environment arguments. Example: `NODE_ENV=production gulp app`
* The file contents of: `li-rnr-app\config\env\all.js`
* The file contents of: `li-rnr-app\config\env\<NODE_ENV>.json` where `NODE_ENV` is a command line argument or global env. Defaults to `development`.
* Teh file contents of: `li-rnr-app\config\local\local.<system-user-name>.json` where `<system-user-name>` is the current system user.
* Any files specified by the global env. value `configs` or the command line argument `--configs`. This takes a comma
separated list of files relative to `li-rnr-app`.

#### Example Config from CLI:

```bash
gulp app --configs=../../some-config-file.json,../foo/some-other-config.json --NODE_ENV=production
```

If a config file does not exist it will be omitted.

The contents of all configs specified will be deep merged in the order specified and made accessible to the application via the `li-rnr-app\configs\config` module.

#### Example Config Use:

```javascript
var config = require('./config/config');

console.log('App started on port: ' + config.get('port'));
```

[travis-url]: http://travis-ci.org/lithiumtech/li-rnr-app
[travis-image]: https://secure.travis-ci.org/lithiumtech/li-rnr-app.png?branch=master

[coveralls-url]: https://coveralls.io/r/lithiumtech/li-rnr-app
[coveralls-image]: https://coveralls.io/repos/lithiumtech/li-rnr-app/badge.png

[depstat-url]: https://david-dm.org/adamayres/lithiumtech/li-rnr-app
[depstat-image]: https://david-dm.org/lithiumtech/li-rnr-app.png

[codeship-url]: https://www.codeship.io/projects/15170
[codeship-image]: https://www.codeship.io/projects/d8436310-85a1-0131-0cc1-4ef271363d26/status?branch=master
