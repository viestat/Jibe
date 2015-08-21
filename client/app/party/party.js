var party = angular.module('grizzly.party', ['ngTable']);

party.controller('PartyController', function ($scope, $window, $location) {

  $scope.party = {
    name: $window.party.name || 'default',
    nowPlaying: {artist: 'Ozma', title: 'Domino Effect'}
  };

  $scope.url = '//www.youtube.com/embed/VAPJ_iieems' + '?rel=0&autoplay=1';
  $scope.queue = [
    {artist: 'Weezer', title: 'Buddy Holly', score: 5},
    {artist: 'Nirvana', title: 'Smells Like Teen Spirit', score: 2},
    {artist: 'Justin Bieber', title: 'Baby', score: -3},
    {artist: 'Novos Baianos', title: 'Brasil Pandeiro', score: 15},
  ];

});
