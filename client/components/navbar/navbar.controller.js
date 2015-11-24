'use strict';

angular.module('pinterestCloneApp')
  .controller('NavbarCtrl', function ($scope, $timeout, $http, $location, Auth, dialogs) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.newPost = {};


    $timeout(function() {
      $http.get('/api/collections/').then(function(response) {
        $scope.allCollections = response.data;
      }, function(err) {
        console.log(err);
      });
    }, 1000);

    $scope.addPost = function(form, cb) {
      $scope.newPost.author = $scope.getCurrentUser().username || "Guest";
      console.log($scope.newPost);

      $http.post('/api/posts/', $scope.newPost).then(function(response) {
        console.log("This is the response");
        console.log(response);
        $http.post('/api/users/addpost', {userid: $scope.getCurrentUser()._id, postid: response.data}).then(function(response) {
            console.log("Success!");
            console.log(response);
          }, function(err) {
            console.log(err);
        });
      }, function(err) {
        console.log(err);
      });

    }

    // $scope.addPostUser = function() {
    //   console.log("Calling Post User!");
      
    // }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.addPostButton = function() {
      dialogs.create('app/posts/addpost.html');
    }


  });