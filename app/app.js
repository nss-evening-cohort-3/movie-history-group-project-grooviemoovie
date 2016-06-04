var app = angular.module("GroovieMoovie", ["ngRoute"]) 
  .constant("firebaseURL","https://groovymovie.firebaseio.com/");

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    console.log("user is authenticated, resolve route promise")
    resolve();
  } else {
    console.log("user is not authenticated, reject route promise");
    reject();
  }
})

app.config(function($routeProvider){
  $routeProvider.
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  }).
  when('/logout', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  }).
  when('/wishlist', {
    templateUrl: 'partials/wishlist.html',
    controller: 'WishListCtrl'
  })
});

app.run(($location) => {
  let movieRef = new Firebase("https://groovymovie.firebaseio.com/");

  movieRef.onAuth(authData => {
    if(!authData){
      $location.path("/login");
    }
  })
})