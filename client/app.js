'use strict';

require('angular/angular');
require('angular-route/angular-route');

var app = angular.module('li.rnr-app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main.html'
    }).otherwise({
      redirectTo: '/'
    });
}]);