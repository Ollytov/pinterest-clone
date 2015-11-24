'use strict';

angular.module('pinterestCloneApp')
  .controller('PostsCtrl', function ($scope, $http, dialogs) {
  	$http.get('/api/posts/').then(function(response) {
  		console.log("Posts Found!");
        console.log(response);
        $scope.postList = response.data;
    }, function(err) {
        console.log(err);
    });

  });
