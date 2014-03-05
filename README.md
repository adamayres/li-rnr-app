[![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> Lithium RnR Application

### Install

1. Install [NodeJs v0.11.10](http://blog.nodejs.org/2013/12/31/node-v0-11-10-unstable/). Scroll down to installer for your OS and click the link.
2. Install git and setup github using these [instructions](https://help.github.com/articles/set-up-git)
3. Add the following to your `~/.bash_profile` and `~/.profile` or equivalent shell profile:
```bash
alias node='node --harmony'
alias gulp='node --harmony `which gulp`'
ulimit -n 10000
```
4.) Start a new terminal and run the following commands:

```bash
# Install gulp globally
npm install -g;

# Create and go into folder where you want to store the Lithium code
mkdir lia; cd lia

# Clone the li-rnr-app branch
git clone https://github.com/lithiumtech/li-rnr-app.git

# Install the npm dependencies in li-rnr-app
cd li-rnr-app; npm install;

# Run the app using the default command of gulp
gulp
```
[travis-url]: http://travis-ci.org/lithiumtech/li-rnr-app
[travis-image]: https://secure.travis-ci.org/lithiumtech/li-rnr-app.png?branch=master

[coveralls-url]: https://coveralls.io/r/lithiumtech/li-rnr-app
[coveralls-image]: https://coveralls.io/repos/lithiumtech/li-rnr-app/badge.png

[depstat-url]: https://david-dm.org/adamayres/lithiumtech/li-rnr-app
[depstat-image]: https://david-dm.org/lithiumtech/li-rnr-app.png


[codeship-url]: https://www.codeship.io/projects/15170
[codeship-image]: https://www.codeship.io/projects/d8436310-85a1-0131-0cc1-4ef271363d26/status?branch=master
