"use strict";

app.controller("WishListCtrl", function($scope, $location, itemStorage, AuthFactory) {
	$scope.items = [];
	// $scope.hasWatched = false;

	$scope.display = function() {
		if ($location.path() === "/wishlist") {
			itemStorage.getItemList().then(function(data) {
				// $scope.hasWatched = false;
				$scope.items = data;
				console.log($scope.items)
			});
		}
	}
	$scope.display();

	$scope.itemDelete = function(itemId){
		console.log("itemId", itemId);
		itemStorage.deleteItem(itemId).then(function(response){
			itemStorage.getItemList().then(function(itemCollection){
				$scope.items = itemCollection;
			})
		})
	}

	$scope.rateMovie = function(movieRating, movieId) {
		itemStorage.movieRating(movieId, movieRating).then(function(data) {
			
			console.log(data);
		})

	}

});


// $scope.items.push(itemCollection[key]);