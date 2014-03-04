'use strict';

module.exports = function ReviewsDirective (liRnrReviewsTpl) {
  return {
    template: liRnrReviewsTpl,
    restrict: 'E',
    link: function ($scope) {
      $scope.reviews = [
        {
          subject: 'Review 1',
          body: 'This is the first review',
          author: {
            username: 'magicaj'
          }
        },
        {
          subject: 'Review 2',
          body: 'This is the second review',
          author: {
            username: 'coolguy'
          }
        }
      ];
    }
  };
};

