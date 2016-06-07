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
  when('/', {
    templateUrl:'partials/search-title.html',
    controller:'SearchOMDBCtrl',
    resolve: {isAuth}
  }).
  when('/addToList', {
    templateUrl:'partials/addNewMovie.html',
    controller:'NewMovieCtrl',
    resolve: {isAuth}
  }).
  when('/watchlist', {
    templateUrl:'partials/watchlist.html',
    controller:'WatchListCtrl',
    resolve: {isAuth}
  }).
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
    controller: 'WishListCtrl',
    resolve: {isAuth}
  }).
  otherwise('/');
});

app.run(($location) => {
  let movieRef = new Firebase("https://groovymovie.firebaseio.com/");

  movieRef.onAuth(authData => {
    if(!authData){
      $location.path("/login");
    }
  })
})