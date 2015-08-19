var party = angular.module('jibe.party', ['ngTable']);

party.controller('PartyController', function ($scope, $location) {

  $scope.nowPlaying = {artist: "Ozma", title: "Domino Effect"};

  $scope.url = '//www.youtube.com/embed/VAPJ_iieems' + '?rel=0&autoplay=1';

  $scope.queue = [
    {artist: "Weezer", title: "Buddy Holly", score: 5},
    {artist: "Nirvana", title: "Smells Like Teen Spirit", score: 2},
    {artist: "Ozma", title: "Domino Effect", score: 3},
    {artist: "Justin Bieber", title: "Baby", score: -3},
    {artist: "Novos Baianos", title: "Brasil Pandeiro", score: 15},
  ];

});