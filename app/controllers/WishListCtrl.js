"use strict";

app.controller("WishListCtrl", function($q, $http, firebaseURL) {

	var getMovieWishList = function () {
		var items = [];
		return $q(function(resolve, reject) {
			$http.get(firebaseURL + "movies.json")
			.success(function(movieWishObject) {
				var movieWishCollection = movieWishObject;
				Object.keys(movieWishCollection).forEach(function(key) {
					movieWishCollection[key].id=key;
				});
				resolve(items);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	var postNewMovieWish = function(newMovieWish) {
		return $q(function(resolve, reject) {
			$http.post(
				firebaseURL + "movies.json", JSON.stringify({
					title: newMovieWish.title,
					posterURL: newMovieWish.posterURL,
					year: newMovieWish.year,
					majorActor: newMovieWish.majorActors,
					rating: newMovieWish.rating,
					hasWatched: newMovieWish.hasWatched
				})
				)
			.success(function(objectFromFirebase) {
				resolve(objectFromFirebase);
			})
		})
	}

	return {getMovieWishList:getMovieWishList, postNewMovieWish:postNewMovieWish};
})