app.controller("NewMovieCtrl", function($scope, $http, $location, itemStorage){
  $scope.submitButtonText = "Add New Movie"
  $scope.pageTitle = "Create New Movie"
  $scope.newItem = {
    title: "",
    posterURL: "",
    year: "",
    hasWatched: true,
    majorActors: "",
    rating: "",
  };

  $scope.addNewItem = function(){
        itemStorage.postNewItem($scope.newItem)
          .then(function successCallback(response){
            $location.url("/items/list");
          })
  }
})