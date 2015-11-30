'use strict';

angular.module('pinterestCloneApp')
  .controller('DashboardCtrl', function ($scope, $http, $timeout, $location, Auth, socket) {
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
    	// $http.get('/api/users/getfollow/' + $scope.user._id).then(function(response) {
	    // 	$scope.collectionList = response.data;
	    // 	socket.syncUpdates('collection', $scope.collectionList, function(event, item, array) {
	    // 		console.log(event);
	    // 		console.log(item);
	    // 		console.log(array);
	    // 	});
	    // }, function(err) {
	    // 	console.log(err);
	    // });
        $scope.postList = $scope.user.posts;
        if ($scope.postList === undefined || $scope.postList.length === 0) {
            $scope.noPosts = true;
        }   else {
            $scope.noPosts = false;
        }
        

    }, 1000);

    
    // angular.forEach($scope.user.posts, function(value) {
    //     console.log(value);
    // });
   

    $scope.addCollection = function(form) {
    	$http.post('/api/collections', {name: $scope.collection.name, author: $scope.user.email}).then(function(response) {
    		console.log("Successfully posted new collection!")
    		console.log(response);
            $scope.collection.name = "";
            $scope.newCollect = true;
            //$scope.$apply();
            console.log("New Collect");
            console.log($scope.newCollect);
    	}, function(err) {
    		console.log(err);
    	});
    	
    	// $http.post('/api/users/addfollow/'+$scope.user._id, {follow: $scope.collection}).then(function(response) {
    	// 	console.log("Successfully Added Follow Target");
    	// }, function(err) {
    	// 	console.log(err);
    	// });
    }

    // $scope.removeFollow = function(collection) {
    // 	$http.post('/api/users/removefollow/'+$scope.user._id, {name: collection.name}).then(function(response) {
    // 		console.log("The Followed Topic has been removed!");
    // 		socket.syncUpdates('collection', $scope.collectionList);
    // 	}, function(err) {
    // 		console.log(err);
    // 	})
    // }

    $scope.changeInfo = function(form) {
        $http.post('/api/users/profile-edit', form).then(function(response) {
            $location.path('/dashboard');
            $scope.savedChanges = true;
            $timeout(function() {
                $scope.savedChanges = true;
                $scope.$apply();
            }, 500);
        }, function(err) {
            console.log(err);
        });
    }

    $scope.getPosts = function() {
        //$scope.newCollect = false;
    	$scope.posts = true;
    	$scope.profile = false;
    	$scope.collections = false;
    }

    $scope.getCollections = function() {
        //$scope.newCollect = false;
    	$scope.posts = false;
    	$scope.profile = false;
    	$scope.collections = true;
    }

    $scope.getProfile = function() {
        //$scope.newCollect = false;
        $scope.posts = false;
        $scope.profile = true;
        $scope.collections = false;
    }

  });
