'use strict';

angular.module('pinterestCloneApp')
  .controller('DashboardCtrl', function ($scope, $http, $timeout, $location, Auth) {
  	$scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    $scope.username = $scope.user.username;
    $scope.collection = {};

    $scope.posts = true;
    $scope.likes = false;
    $scope.collections = false;
    $scope.newCollect = false;

    $scope.savedChanges = false;

    $scope.userid = $scope.user;

    $timeout(function() {

        $scope.postList = $scope.user.posts;
        if ($scope.postList === undefined || $scope.postList.length === 0) {
            $scope.noPosts = true;
        }   else {
            $scope.noPosts = false;
        }
        

    }, 1000);

    $scope.addCollection = function() {
    	$http.post('/api/collections', {name: $scope.collection.name, author: $scope.user.email}).then(function(response) {
            $scope.collection.name = '';
            $scope.newCollect = true;
    	}, function(err) {
    		console.log(err);
    	});
    	
    };

    $scope.changeInfo = function(form) {
        $http.post('/api/users/profile-edit', form).then(function() {
            $location.path('/dashboard');
            $scope.savedChanges = true;
            $timeout(function() {
                $scope.savedChanges = true;
                $scope.$apply();
            }, 500);
        }, function(err) {
            console.log(err);
        });
    };

    $scope.getPosts = function() {
    	$scope.posts = true;
    	$scope.profile = false;
    	$scope.collections = false;
    };

    $scope.getCollections = function() {
    	$scope.posts = false;
    	$scope.profile = false;
    	$scope.collections = true;
    };

    $scope.getProfile = function() {
        $scope.posts = false;
        $scope.profile = true;
        $scope.collections = false;
    };

  });
