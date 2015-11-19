'use strict';

angular.module('pinterestCloneApp')
  .controller('DashboardCtrl', function ($scope, $http, $timeout, dialogs, Auth, socket) {
  	$scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    $scope.collection = {};

    $scope.userid = $scope.user;

    $timeout(function() {
    	$http.get('/api/users/getfollow/' + $scope.user._id).then(function(response) {
	    	$scope.collectionList = response.data;
	    	socket.syncUpdates('collection', $scope.collectionList, function(event, item, array) {
	    		console.log(event);
	    		console.log(item);
	    		console.log(array);
	    	});
	    }, function(err) {
	    	console.log(err);
	    });
    }, 1000);
   
   
    $scope.addCollectionButton = function() {

    	dialogs.create('app/dashboard/dashboard-addCollection.html');
    }

    $scope.addCollection = function(form) {
    	$http.post('/api/collections', {name: $scope.collection.name, image: $scope.collection.image, author: $scope.user.email}).then(function(response) {
    		console.log("Successfully posted new collection!")
    		console.log(response);
    	}, function(err) {
    		console.log(err);
    	});
    	
    	$http.post('/api/users/addfollow/'+$scope.user._id, {follow: $scope.collection}).then(function(response) {
    		console.log("Successfully Added Follow Target");
    	}, function(err) {
    		console.log(err);
    	});
    }

    $scope.removeFollow = function(collection) {
    	$http.post('/api/users/removefollow/'+$scope.user._id, {name: collection.name}).then(function(response) {
    		console.log("The Followed Topic has been removed!");
    		socket.syncUpdates('collection', $scope.collectionList);
    	}, function(err) {
    		console.log(err);
    	})
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('books');
    });
  });
