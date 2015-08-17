angular.module('jibe', [
    'jibe.playlist',
    'jibe.playlist.search',
    'jibe.host',
    'jibe.home',
    'ngSanitize',
    'ui.select',
    'ui.router'
])

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('home');

  $stateProvider
    // .state('signin', {
    //   templateUrl: 'app/auth/signin.html',
    //   url: '/signin',
    //   controller: 'AuthController'
    // })
    // .state('signup', {
    //   templateUrl: 'app/auth/signup.html',
    //   url: '/signup',
    //   controller: 'AuthController'
    // })
    // .state('signout', {
    //   templateUrl: 'app/auth/signout.html',
    //   url: '/signout',
    //   controller: 'AuthController'
    // })
    .state('home', {
      templateUrl: 'app/home/home.html',
      url: '',
      controller: 'HomeCtrl'
    })
    .state('host', {
      templateUrl: 'app/host/host.html',
      url: '/host/:playlistId',
      controller: 'PlaylistCtrl'
    })
    .state('playlist', {
      templateUrl: 'app/playlist/playlist.html',
      url: '/playlist/:playlistId',
      controller: 'PlaylistCtrl'
    })
    // nested list with custom controller
    .state('playlist.search', {
        templateUrl: 'app/playlist/playlist-search.html',
        controller: 'SearchCtrl'
    });
});
