'use strict';

angular.module('pinterestCloneApp')
  .controller('PostsCtrl', function ($scope, $http, socket) {
  	$http.get('/api/posts/').then(function(response) {
        $scope.postList = response.data;
        socket.syncUpdates('post', $scope.postList);
    }, function(err) {
        console.log(err);
    });


  	$scope.$on('$destroy', function () {
      socket.unsyncUpdates('post');
    });
  });
