"use strict";

app.controller('SearchOMDBCtrl', function($scope, $location, $routeParams, itemStorage){
  $scope.movieResults = [];
  $scope.searchMovie = "";

  $scope.searchForMovie = function() {
    console.log('searching for:', $scope.searchMovie);
    itemStorage.searchOMDB($scope.searchMovie)
      .then(function(searchResults){
        $scope.movieResults = searchResults;
        console.log($scope.movieResults)
      });
  };

    $scope.searchSingleMovie = function(movieTitle) {
    console.log('searching for single movie', movieTitle);
    itemStorage.searchByTitle(movieTitle)
      .then(function(searchResults){
        itemStorage.postNewItem(searchResults)
      });
  };
});

