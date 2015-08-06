angular.module('djBooth', [
               'djBooth.controllers',
               'djBooth.factories',
               'ngRoute'
               ])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '../HTML/home.html',
      controller: 'searchController',
    })

})
.run(function ($rootScope, $location) {

      $location.path('/home');
});