var app = angular.module('jibe', [
  'jibe.home',
  'jibe.host',
  'jibe.portal',
  'jibe.party',
  // 'jibe.playlist',
  'jibe.services',
  'ngSanitize',
  'ui.select',
  'ui.router',
  'ngTable'
]);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    // App main page
    .state('home', {
      url: '/home',
      templateUrl: 'app/home/home.html'
    })
    // Party screen with fullscreen youtube video
    .state('party', {
      url: '/party',
      templateUrl: 'app/party/party.html'
    })
    // This is the main screen that users will interface with
    .state('portal', {
      url: '/portal',
      templateUrl: 'app/portal/portal.html'
    })
    // This is the view that the host uses to create a party event
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
