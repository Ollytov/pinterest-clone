'use strict';

angular.module('pinterestCloneApp')
  .controller('PostCategoryCtrl', function ($scope, $http, $state, $stateParams) {
    $scope.category = $state.params.category;
    $http.get('/api/posts/').then(function(response) {
        var tempList = [];
        for (var i = 0; i < response.data.length; i++) {
        	if (response.data[i].postCollection === $state.params.category) {
        		tempList.push(response.data[i]);
        	}
        }
        $scope.postList = tempList;
    }, function(err) {
        console.log(err);
    });
  });
