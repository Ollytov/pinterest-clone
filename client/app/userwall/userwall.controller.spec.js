'use strict';

describe('Controller: UserwallCtrl', function () {

  // load the controller's module
  beforeEach(module('pinterestCloneApp'));

  var UserwallCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserwallCtrl = $controller('UserwallCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
