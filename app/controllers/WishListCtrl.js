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
		});
	

// $scope.items.push(itemCollection[key]);