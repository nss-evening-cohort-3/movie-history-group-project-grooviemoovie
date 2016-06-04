app.controller("WatchListCtrl", function( $scope, $http, itemStorage){
  $scope.items = [];

  itemStorage.getItemList().then(function(itemCollection){
    console.log("item collection", itemCollection );
    $scope.items = itemCollection;
  })
    $scope.itemDelete = function(itemId){
      console.log("itemId", itemId);
      itemStorage.deleteItem(itemId).then(function(response){
        itemStorage.getItemList().then(function(itemCollection){
          $scope.items = itemCollection;
        })
      })
    }

    $scope.inputChange = function(item){
      itemStorage.updateCompletedStatus(item)
        .then(function(response){
          console.log("response", response);
      })
    }
});