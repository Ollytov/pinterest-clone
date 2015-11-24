'use strict';

angular.module('pinterestCloneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('post-category', {
        url: '/posts/category/:category',
        templateUrl: 'app/post-category/post-category.html',
        controller: 'PostCategoryCtrl'
      });
  });