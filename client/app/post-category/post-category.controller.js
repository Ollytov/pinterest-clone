'use strict';

angular.module('pinterestCloneApp')
  .controller('PostCategoryCtrl', function ($scope, $http, $state, socket) {
    $scope.category = $state.params.category;
    $http.get('/api/posts/').then(function(response) {
        var tempList = [];
        for (var i = 0; i < response.data.length; i++) {
        	if (response.data[i].postCollection === $state.params.category) {
        		tempList.push(response.data[i]);
        	}
        }
        $scope.newPosts = [];
        $scope.postList = tempList;
        socket.syncUpdates('post', $scope.newPosts, function() {
            if ($scope.newPosts[0].postCollection === $state.params.category) {
                $scope.postList.push($scope.newPosts);
            }
            $scope.newPosts = [];
        });
    }, function(err) {
        console.log(err);
    });
  });
