'use strict';

var angular = require('angular');
require('angular-route');
require('./module');

var app = angular.module('li.rnr-app', [
  'ngRoute',
  'li.rnr.directives.reviews'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main.html'
    }).otherwise({
      redirectTo: '/'
    });
}]);

