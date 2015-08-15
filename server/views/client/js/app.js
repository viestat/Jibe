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
    // $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('host.html#/');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
//run function is called on the app to start the app
.run(function ($rootScope, $location) {
  
   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});


