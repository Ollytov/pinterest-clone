'use strict';

angular.module('pinterestCloneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userwall', {
        url: '/posts/wall',
        templateUrl: 'app/userwall/userwall.html',
        controller: 'UserwallCtrl'
      });
  });