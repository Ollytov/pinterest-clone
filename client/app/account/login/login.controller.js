'use strict';

angular.module('pinterestCloneApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $timeout, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    console.log($scope.isLoggedIn());

    $timeout(function() {
      if ($scope.isLoggedIn()) {
        console.log("Logged In!");
        $location.path('/posts');
      }
    }, 1000);

    $scope.login = function(form) {
      console.log("Logging In");
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to dashboard
          $location.path('/dashboard');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
