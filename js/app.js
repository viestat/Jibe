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
    .when('/home', {
      templateUrl: '../HTML/home.html',
      controller: 'searchController',
    })

})
//run function is called on the app to start the app
.run(function ($rootScope, $location) {
  
      $location.path('/home');
});