'use strict';

describe('liRnrReviews', function () {
  var $rootScope, $compile;

  beforeEach(angular.mock.module('li.rnr.directives.reviews'));

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('should render a list of reviews', function () {
    var element;

    element = $compile('<li:rnr-reviews></li:rnr-reviews>')($rootScope.$new());
    $rootScope.$digest();

    expect(element.find('li').length).toBe(2);
  });
});
