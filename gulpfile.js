'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var nodeOpen = require('open');
var browserify = require('gulp-browserify');
var partialify = require('partialify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var karma = require('gulp-karma');
var lrServer = require('tiny-lr')();
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var prettyTime = require('pretty-hrtime');
var config = require('./config/config');
var app = require('./server/server');

var scriptsTask = function (src, file, browserifyConfig) {
  return gulp.src(src)
    //.pipe(require('gulp-filelog')())
    .pipe(browserify(browserifyConfig))
    .pipe(concat(file))
    .pipe(gulp.dest('.tmp'))
    .pipe(livereload(lrServer));
};

function mainBrowserifyConfig () {
  return {
    //insertGlobals : true,
    //debug : true,
    alias: [
      'bower_components/angular/angular.js:angular',
      'bower_components/angular-route/angular-route.js:angular-route'
    ],
    external: [
      'angular',
      'angular-route'
    ],
    transform: [partialify]
  };
}

gulp.task('default', ['app']);

gulp.task('app', ['scripts', 'styles'], function (cb) {
  app();
  nodeOpen('http://localhost:' + config.port);

  lrServer.listen(35729, function (err) {
    if (err) {
      return gutil.log(err);
    }
  });

  gulp.watch(['client/**/!(*.demo|*.spec|*.mock|*.config).js', 'client/**/*.tpl.html'], function () {
    var startTime, totalTime, stream;
    startTime = process.hrtime();
    stream = scriptsTask('client/app.js', 'app.js', mainBrowserifyConfig());
    stream.on('finish', function () {
      totalTime = prettyTime(process.hrtime(startTime));
      gutil.log('Finished', '\'' + gutil.colors.cyan('reload') + '\'', 'in', gutil.colors.magenta(totalTime));
    });
  });

  cb();
});

gulp.task('scripts', ['scripts-libs'], function() {
  return scriptsTask('client/app.js', 'app.js', mainBrowserifyConfig());
});

gulp.task('scripts-libs', function () {
  return scriptsTask([
    'client/libs.js'
  ], 'libs.js', {
    insertGlobals : true,
    debug : true,
    shim: {
      angular: {
        path: 'bower_components/angular/angular.js',
        exports: 'angular'
      },
      'angular-route': {
        path: 'bower_components/angular-route/angular-route.js',
        exports: 'ngRoute',
        depends: {
          angular: 'angular'
        }
      }
    }
  });
});

gulp.task('scripts-spec', ['scripts-libs'], function() {
  return scriptsTask('client/spec.js', 'spec.js', {
    external: [
      'angular',
      'angular-route'
    ],
    transform: [partialify],
    shim: {
      'angular-mocks': {
        path: 'bower_components/angular-mocks/angular-mocks.js',
        exports: 'ngMocks',
        depends: {
          angular: 'angular'
        }
      }
    }
  });
});

gulp.task('test', ['scripts-spec'], function () {
  gulp.src('DO_NOT_MATCH') //use the files in the karma.conf.js
    .pipe(karma({
      configFile: './karma.conf.js',
      action: 'run'
    }));
});

gulp.task('styles', function () {
  return gulp.src('client/module.scss')
    .pipe(sass({
      includePaths: []
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('clean', function () {
  gulp.src('.tmp').pipe(clean());
});