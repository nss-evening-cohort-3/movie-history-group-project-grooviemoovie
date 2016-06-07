"use strict";

app.controller("WishListCtrl", function($scope, $http, $routeParams, firebaseURL, itemStorage) {
	$scope.items = [];	
		itemStorage.populateWishList().then(function(response) {
			$scope.items = response;
			
			// $scope.items = $scope.items.filter(function(movie) {
			// 	console.log(movie);
			// 	// return movie.uid === $routeParams
			// })


			console.log(response);
		})
	})

// $scope.items.push(itemCollection[key]);