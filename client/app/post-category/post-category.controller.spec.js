'use strict';

describe('Controller: PostCategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('pinterestCloneApp'));

  var PostCategoryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostCategoryCtrl = $controller('PostCategoryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
