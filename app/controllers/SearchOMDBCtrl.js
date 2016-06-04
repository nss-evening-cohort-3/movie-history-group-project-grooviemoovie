"use strict";

app.controller('SearchOMDBCtrl', function($scope, $location, $routeParams, temporaryFactory){
  $scope.movieResults = [];
  $scope.searchMovie = "";


  $scope.searchForMovie = function() {
    console.log('searching for:', $scope.searchMovie);
    temporaryFactory.searchOMDB($scope.searchMovie)
      .then(function(searchResults){
        $scope.movieResults = searchResults;
        console.log($scope.movieResults)
      })
  }

  // return $scope.searchResults

});


app.factory('temporaryFactory', function($q, $http){

  
  var searchOMDB = function(searchMovie) {
    var items = []
    return $q(function(resolve, reject){
      $http.get(`http://www.omdbapi.com/?s=${searchMovie}&y=&plot=short&type=&r=json`)
        .success(function(movieObject){
          var searchResults = movieObject;
            items.push(searchResults.Search)
            resolve(items[0]);
        }) //.success
      }); //$q
  };




return {searchOMDB: searchOMDB}

})
