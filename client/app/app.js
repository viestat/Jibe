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