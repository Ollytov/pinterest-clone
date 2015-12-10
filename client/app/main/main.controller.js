'use strict';

angular.module('pinterestCloneApp')
  .controller('MainCtrl', function ($scope, $location, $http, $timeout, $window, Auth) {
    $scope.user = {};
    $scope.errors = {};
    $scope.initCheck = true;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $timeout(function() {
      if ($scope.isLoggedIn() === true) {
        $location.path('/posts');
      }
    }, 1000);


    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/dashboard');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
