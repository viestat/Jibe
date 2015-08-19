var app = angular.module('jibe', [
  'jibe.playlist',
  'jibe.services',
  'jibe.host',
  'ngSanitize',
  'ui.select',
  'ui.router']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/home/home.html'
    })
    .state('guest', {
      url: '/guest',
      templateUrl: 'app/guest/guest.html'
    })
    .state('host', {
      url: '/host',
      templateUrl: 'app/host/host.html',
      controller: 'PlaylistCtrl'
    });
    // .state('login', {
    //     url: ''
    //     templateUrl: 'app/login/login.html',
    // })
    // .state('host', {
    //     templateUrl: 'app/host/host.html',
    //     url: '/host/:playlistId',
    //     controller: 'PlaylistCtrl'
    // })
    // .state('guest', {
    //     url: '/playlist',
    //     templateUrl: 'app/playlist/playlist.html',
    //     controller: 'PlaylistCtrl'
    // });
    // nested list with custom controller
    // .state('.search', {
    //     parent: 'guest',
    //     url: '/search',
    //     templateUrl: 'app/playlist/playlist-search.html'
    // });
});

app.constant('YT_event', {
  STOP: 0,
  PLAY: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});
