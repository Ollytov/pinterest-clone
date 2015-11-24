// 'use strict';

// angular.module('pinterestCloneApp')
//   .controller('MainCtrl', function ($scope, $location, $http, $timeout, $window, Auth) {
//     $scope.user = {};
//     $scope.errors = {};
//     $scope.initCheck = true;

//     $scope.continue = function() {
//       console.log("Continuing...");
//       $timeout(function() {
//         if (angular.element(".form-email").hasClass("has-success") && angular.element(".form-password").hasClass("has-success")) {
//           $scope.initCheck = false;
//         }
//       }, 1000);
//       console.log("Finished!");
//       console.log($scope.initCheck);
//     }

//     $scope.register = function(form) {
//       console.log("Registering");
//       $scope.submitted = true;

//       if(form.$valid) {
//         Auth.createUser({
//           name: $scope.user.name,
//           email: $scope.user.email,
//           password: $scope.user.password
//         })
//         .then( function() {
//           // Account created, redirect to home
//           $location.path('/dashboard');
//         })
//         .catch( function(err) {
//           err = err.data;
//           $scope.errors = {};

//           // Update validity of form fields that match the mongoose errors
//           angular.forEach(err.errors, function(error, field) {
//             form[field].$setValidity('mongoose', false);
//             $scope.errors[field] = error.message;
//           });
//         });
//       }
//     };

//     $scope.loginOauth = function(provider) {
//       $window.location.href = '/auth/' + provider;
//     };
//   });




'use strict';

angular.module('pinterestCloneApp')
  .controller('MainCtrl', function ($scope, $location, $http, $timeout, $window, Auth) {
    $scope.user = {};
    $scope.errors = {};
    $scope.initCheck = true;

    // $scope.continue = function() {
    //   console.log("Continuing...");
    //   $timeout(function() {
    //     if (angular.element(".form-email").hasClass("has-success") && angular.element(".form-password").hasClass("has-success")) {
    //       $scope.initCheck = false;
    //     }
    //   }, 1000);
    //   console.log("Finished!");
    //   console.log($scope.initCheck);
    // }

    $scope.register = function(form) {
      console.log("Registering");
      $scope.submitted = true;
      console.log($scope.user.username);
      console.log(form);

      if(form.$valid) {
        console.log("Form is valid!");
        Auth.createUser({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          console.log("Success!! Relocating...");
          // Account created, redirect to home
          $location.path('/dashboard');
        })
        .catch( function(err) {
          console.log("Uh oh! Error!");
          console.log(err);
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
