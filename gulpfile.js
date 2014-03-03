'use strict';

var gulp = require('gulp');
var nodeOpen = require('open');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var app = require('./server/server');

gulp.task('default', ['app']);

gulp.task('app', ['scripts'], function (cb) {
  app();
  nodeOpen('http://localhost:3000');
  cb();
});

gulp.task('scripts', function(cb) {
  return gulp.src(['./client/**/*.js'])
    .pipe(browserify({
      insertGlobals : true,
      debug : true
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('clean', function () {
  gulp.src('.tmp').pipe(clean());
});