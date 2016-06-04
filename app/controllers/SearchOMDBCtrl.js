"use strict";

app.controller('SearchOMDBCtrl', function($scope, $location, $routeParams, temporaryFactory){
  
  $scope.searchMovie = "";

  $scope.searchForMovie = function() {
    // console.log('searching for:', $scope.searchMovie);
    temporaryFactory.searchOMDB($scope.searchMovie);
  }


})


app.factory('temporaryFactory', function($q, $http){

  var searchOMDB = function(searchMovie) {
    var items = []
    return $q(function(resolve, reject){
      $http.get(`http://www.omdbapi.com/?t=${searchMovie}&y=&plot=short&type=&r=json`)
        .success(function(movieObject){
          console.log(movieObject)
          var searchResults = movieObject;
        }) //.success
          resolve(items);
          console.log(searchResults)
    }); //$q

  


  }




return {searchOMDB: searchOMDB}

})
