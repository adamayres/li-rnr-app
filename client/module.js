'use strict';

var angular = require('angular');

module.exports = angular.module('li.rnr.directives.reviews', [])
  .constant('liRnrReviewsTpl', require('./directives/reviews/reviews.tpl.html'))
  .directive('liRnrReviews', require('./directives/reviews/reviews'));