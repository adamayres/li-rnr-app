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

var scriptsTask = function (src, file) {
  return gulp.src(src)
    //.pipe(require('gulp-filelog')())
    .pipe(browserify({
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
        },
        'angular-mocks': {
          path: 'bower_components/angular-mocks/angular-mocks.js',
          exports: 'ngMocks',
          depends: {
            angular: 'angular'
          }
        }
      },
      transform: [partialify]
    }))
    .pipe(concat(file))
    .pipe(gulp.dest('.tmp'))
    .pipe(livereload(lrServer));
};

gulp.task('default', ['app']);

gulp.task('app', ['scripts', 'styles'], function (cb) {
  var config = require('./config/config');
  var app = require('./server/server');
  app();
  nodeOpen('http://localhost:' + config.port);

  lrServer.listen(35729, function (err) {
    if (err) {
      return gutil.log(err);
    }
  });

  gulp.watch(['client/**/!(*.demo|*.spec|*.mock|*.config).js', 'client/**/*.tpl.html'], function () {
    scriptsTask('client/**/!(*.demo|*.spec|*.mock|*.config).js');
  });

  cb();
});

gulp.task('scripts', function() {
  return scriptsTask('client/app.js', 'app.js');
});

gulp.task('scripts-spec', function() {
  return scriptsTask('client/spec.js', 'spec.js');
});

gulp.task('test', ['scripts-spec'], function () {
  gulp.src('DO_NOT_MATCH') //use the files in the karma.conf.js
    .pipe(karma({
      configFile: './karma.conf.js',
      action: 'run'
    }));
});

gulp.task('styles', function () {
  var sass = require('gulp-sass');
  return gulp.src('client/module.scss')
    .pipe(sass({
      includePaths: []
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('clean', function () {
  gulp.src('.tmp').pipe(clean());
});