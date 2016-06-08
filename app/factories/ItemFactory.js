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
          title: newItem.Title,
          posterURL: newItem.Poster,
          year: newItem.Year,
          majorActors: newItem.Actors.split(", "),
          rating: "",
          hasWatched: false,
          uid: user.uid
        })
        ).success(
        function(objectFromFirebase){
          resolve(objectFromFirebase);
        }
        );
      })
  }

  var deleteItem = function(itemId){
    return $q(function(resolve,reject){
      $http.delete(firebaseURL + `items/${itemId}.json`)
      .success(function(objectFromFirebase){
        resolve(objectFromFirebase)
      })
    })
  };

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


  var populateWishList = function() {
    var items = [];
    var user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
      $http.get(`${firebaseURL}movies.json`)
      .success(function(itemObject) {
        var itemCollection = itemObject;
        Object.keys(itemCollection).forEach(function(item) {
          if (itemCollection[movie].uid === user.uid && itemCollection[item].hasWatched === false) {
            itemCollection[item].id = item;
            items.push(itemCollection[item]);
          }
        });
          resolve(items);
      })
      .error(function(error) {
        reject(error);
      });
    });
   
  };




    var searchByTitle = function(searchMovie) {
    var items = []
    return $q(function(resolve, reject){
      $http.get(`http://www.omdbapi.com/?t=${searchMovie}&y=&plot=short&type=&r=json`)
        .success(function(movieObject){
          var searchResults = movieObject;
            items.push(searchResults)
            console.log(items)
            resolve(items[0]);
        }) //.success
      }); //$q
   };

  return {getItemList:getItemList, postNewItem:postNewItem, searchOMDB: searchOMDB, deleteItem:deleteItem, searchByTitle:searchByTitle, populateWishList:populateWishList}
  
})

