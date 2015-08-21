var app = angular.module('grizzly', [
  'grizzly.home',
  'grizzly.host',
  'grizzly.portal',
  'grizzly.party',
  'grizzly.playlist',
  'grizzly.enqueue',
  'grizzly.services',
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
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    // Party screen with fullscreen youtube video
    .state('party', {
      url: '/party',
      templateUrl: 'app/party/party.html',
      controller: 'PartyController'
    })
    // This is the main screen that users will interface with
    .state('portal', {
      url: '/portal',
      templateUrl: 'app/portal/portal.html',
      controller: 'PortalController'
    })
    // This is the view that the host uses to create a party event
    .state('host', {
      url: '/host',
      templateUrl: 'app/host/host.html',
      controller: 'HostController'
    })
    // This is the view that allows users to add songs to the playlist queue
    .state('enqueue', {
      url: '/enqueue',
      templateUrl: 'app/enqueue/enqueue.html',
      controller: 'EnqueueController'
    })
    // .state('login', {
    //     url: ''
    //     templateUrl: 'app/login/login.html',
    // })
    // .state('host', {
    //     templateUrl: 'app/host/host.html',
    //     url: '/host/:playlistId',
    //     controller: 'PlaylistCtrl'
    // })
    .state('playlist', {
        url: '/playlist',
        templateUrl: 'app/playlist/playlist.html',
        controller: 'PlaylistController'
    });
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
