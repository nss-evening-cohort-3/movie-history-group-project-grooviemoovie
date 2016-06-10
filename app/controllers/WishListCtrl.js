"use strict";

app.controller("WishListCtrl", function($scope, $location, itemStorage, AuthFactory) {
	$scope.items = [];
	$scope.movieObject = {};

	$scope.display = function() {
		if ($location.path() === "/wishlist") {
			itemStorage.getItemList().then(function(data) {
				$scope.items = data;
			});
		}
	}
	$scope.display();

	$scope.itemDelete = function(itemId){
		itemStorage.deleteItem(itemId).then(function(response){
			itemStorage.getItemList().then(function(itemCollection){
				$scope.items = itemCollection;
			})
		})
	}

	$scope.rateMovie = function(movieRating, movieId) {
		itemStorage.getSingleItem(movieId)
		.then(function successCallBack(response){
			itemStorage.movieRating(movieId, movieRating, response).then(function(response){
			itemStorage.getItemList().then(function(itemCollection){
				$scope.items = itemCollection;
			})
		})
		})
	}

});