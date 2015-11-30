'use strict';

angular.module('pinterestCloneApp')
  .controller('UserwallCtrl', function ($scope, $http, $state, $stateParams, $location) {
  	$scope.user = $state.params.userid;
  	$http.get('/api/users/'+$scope.user).then(function(response) {
  		$scope.postList = response.data.posts;
  		$scope.username = response.data.username;
  		if ($scope.postList.length === 0) {
  			$scope.noPosts = true;
  		}	else {
  			$scope.noPosts = false;
  		}

  	}, function(err) {
		$location.path('/posts');
  	});
  });
