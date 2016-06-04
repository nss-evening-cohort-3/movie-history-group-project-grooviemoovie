"use strict";

app.controller('SearchOMDBCtrl', function($scope, $location, $routeParams, temporaryFactory){
  $scope.searchResults = [];
  $scope.searchMovie = "";

  $scope.searchForMovie = function() {
    console.log('searching for:', $scope.searchMovie);
    temporaryFactory.searchOMDB($scope.searchMovie)
      .then(function(searchResults){
        $scope.searchResults = searchResults;
        console.log($scope.searchResults)
      })
  }


})


app.factory('temporaryFactory', function($q, $http){

  var searchOMDB = function(searchMovie) {
    var items = []
    return $q(function(resolve, reject){
      $http.get(`http://www.omdbapi.com/?s=${searchMovie}&y=&plot=short&type=&r=json`)
        .success(function(movieObject){
          // console.log(movieObject)
          var searchResults = movieObject;
          // console.log(searchResults.Search);
          items.push(searchResults.Search);
          // console.log(items);
          resolve(items);
        }) //.success
    }); //$q

  


  }




return {searchOMDB: searchOMDB}

})
