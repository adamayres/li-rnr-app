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
var touch = require('touch');
var Q = require('q');
var fs = require('fs');
var config = require('./config/config');

function scriptsTask (src, file, dest, browserifyConfig) {
  return gulp.src(src)
    .pipe(browserify(browserifyConfig))
    .pipe(concat(file))
    .pipe(gulp.dest(dest))
    .pipe(livereload(lrServer));
}

function stlyesTask (src, dest) {
  return gulp.src(src)
    .pipe(sass())
    .pipe(gulp.dest(dest))
    .pipe(livereload(lrServer));
}

function mainBrowserifyConfig () {
  return {
    insertGlobals : true,
    debug : true,
    alias: [
      'bower_components/angular/angular.js:angular',
      'bower_components/angular-route/angular-route.js:angular-route'
    ],
    external: [
      'angular',
      'angular-route'
    ],
    transform: ['partialify']
  };
}

function streamTimer (taskFunc) {
  var startTime, totalTime, stream;
  startTime = process.hrtime();
  stream = taskFunc();
  stream.on('finish', function () {
    totalTime = prettyTime(process.hrtime(startTime));
    gutil.log('Finished', '\'' + gutil.colors.cyan('reload') + '\'', 'in', gutil.colors.magenta(totalTime));
  });
}

/**
 * Set the default task to run the app
 */
gulp.task('default', ['app']);

/**
 * Start the application and apply file watchers
 */
gulp.task('app', ['scripts', 'styles'], function (cb) {
  require('./server');
  nodeOpen('http://localhost:' + config.get('port'));

  /**
   * Start the livereload server
   */
  lrServer.listen(35729, function (err) {
    if (err) {
      return gutil.log(err);
    }

    /**
     * Watch script files to trigger recompile
     */
    gulp.watch(['public/**/!(*.demo|*.spec|*.mock).js', 'public/**/*.tpl.html'], function () {
      streamTimer(function () {
        return scriptsTask('public/app.js', 'app.js', '.tmp', mainBrowserifyConfig());
      });
    });

    /**
     * Watch styles files to trigger recompile
     */
    gulp.watch('public/**/*.scss', function () {
      console.log('reload styles');
      streamTimer(function () {
        return stlyesTask('public/module.scss', '.tmp');
      });
    });
  });

  cb();
});

/**
 * Compile JavaScript for app
 */
gulp.task('scripts', ['scripts-libs'], function() {
  return scriptsTask('public/app.js', 'app.js', '.tmp', mainBrowserifyConfig());
});

/**
 * Compile JavaScript for external libraries
 */
gulp.task('scripts-libs', function () {
  var deferred = Q.defer();
  touch('libs.js', {}, function () {
    var stream = scriptsTask('libs.js', 'libs.js', '.tmp', {
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

    stream.on('finish', function () {
      fs.unlink('libs.js');
      deferred.resolve();
    });
  });
  return deferred.promise;
});

/**
 * Compile JavaScript for karma spec tests
 */
gulp.task('scripts-spec', ['scripts-libs'], function() {
  return scriptsTask('public/spec.js', 'spec.js', '.tmp', {
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

/**
 * Run the karma spec tests
 */
gulp.task('test', ['scripts-spec'], function () {
  return gulp.src('DO_NOT_MATCH') //use the files in the karma.conf.js
    .pipe(karma({
      configFile: './karma.conf.js',
      action: 'run'
    }));
});

/**
 * Compile the styles
 */
gulp.task('styles', function () {
  return stlyesTask('public/module.scss', '.tmp');
});

/**
 * Delete the .tmp directory
 */
gulp.task('clean', function () {
  return gulp.src('.tmp').pipe(clean());
});
