'use strict';

angular.module('pinterestCloneApp')
  .controller('AddpostCtrl', function ($scope, $timeout, $location, $http, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.newPost = {};

    $timeout(function() {
      $http.get('/api/collections/').then(function(response) {
        $scope.allCollections = response.data;
      }, function(err) {
        console.log(err);
      });
    }, 1000);

    $scope.addPost = function() {
      $scope.newPost.author = $scope.getCurrentUser().username;
      $scope.newPost.authorid = $scope.getCurrentUser()._id;
      console.log($scope.newPost);

      $http.post('/api/posts/', $scope.newPost).then(function(response) {
        console.log('This is the response');
        console.log(response);
        $http.post('/api/users/addpost', {userid: $scope.getCurrentUser()._id, postid: response.data}).then(function(response) {
            $location.path('/posts');
          }, function(err) {
            console.log(err);
        });
      }, function(err) {
        console.log(err);
      });

    }
  });