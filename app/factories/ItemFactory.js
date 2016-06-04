'use strict';
app.factory("itemStorage", function($q, $http, firebaseURL, AuthFactory){

  var getItemList = function(){
    var items = [];
    let user = AuthFactory.getUser();
    console.log("user", user);
    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}items.json?orderBy="uid"&equalTo="${user.uid}"`)
        .success(function(itemObject){
          var itemCollection = itemObject;
          Object.keys(itemCollection).forEach(function(key){
            itemCollection[key].id=key;
            items.push(itemCollection[key]);
          })
          resolve(items);
        })
        .error(function(error){
          reject(error);
        });
      })
  };

  var postNewItem = function(newItem){
    let user = AuthFactory.getUser();
    console.log("user", user);
    return $q(function(resolve,reject){
      $http.post(
        firebaseURL + "items.json",
        JSON.stringify({
          title: newItem.title,
          posterURL: newItem.posterURL,
          year: newItem.year,
          majorActors: newItem.majorActors,
          rating: newItem.rating,
          hasWatched: newItem.hasWatched,
          uid: user.uid
        })
        ).success(
        function(objectFromFirebase){
            resolve(objectFromFirebase);
        }
      );
    })
  }

  return {getItemList:getItemList, postNewItem:postNewItem}
  
})