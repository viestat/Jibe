//here is the master app module (djBooth) with it's dependencies set to the 
angular.module('djBooth', [
               'djBooth.controllers',
               'djBooth.factories',
               'ngRoute',
               'ngSanitize',
               'ui.select'
               ])
//route provider is here
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/host/*', {
      templateUrl: '../HTML/host.html',
      controller: 'searchController'
    })
    .when('/guest/*', {
      templateUrl:'../HTML/guest.html',
      controller: 'searchController'
    })
    .when('/signin', {
      templateUrl:'../HTML/signin.html',
      controller: 'searchController'

    })
    .otherwise({
      redirectTo:'/host'
    })

})
//run function is called on the app to start the app
.run(function ($rootScope, $location) {
  
      $location.path('/');
});