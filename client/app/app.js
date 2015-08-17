angular.module('jibe', [
    'jibe.playlist',
    'jibe.services',
    'jibe.host',
    'ngSanitize',
    'ui.select',
    'ui.router'
])

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  // var authenticated = ['$q', 'AuthFactory', function ($q, AuthFactory) {
  //   var deferred = $q.defer();
  //   AuthFactory.isLoggedIn(false)
  //     .then(function(isLoggedIn) {
  //       if (isLoggedIn) {
  //         deferred.resolve();
  //       } else {
  //         deferred.reject('Not logged in.');
  //       }
  //     });
  //   return deferred.promise;
  // }];

  $stateProvider
    .state('home', {
      templateUrl: 'app/home/home.html',
      url: ''
    })
    .state('host', {
      templateUrl: 'app/host/host.html',
      url: '/host/:playlistId',
      controller: 'PlaylistCtrl'
    })
    .state('guest', {
      templateUrl: 'app/playlist/playlist.html',
      url: '/playlist/:playlistId',
      controller: 'PlaylistCtrl'
    })
    // nested list with custom controller
    .state('.search', {
      parent: 'guest',
      url: '/search',
      templateUrl: 'app/playlist/playlist-search.html',
    });
});
// .run(function ($rootScope, $state) {
//   // Redirect to login if route requires auth and you're not logged in
//   $rootScope.$on('$stateChangeError', function (err, req) {
//     $state.go('login');
//   });
// });