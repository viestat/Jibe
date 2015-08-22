var party = angular.module('grizzly.party', ['ngTable']);

party.controller('PartyController', function ($scope, $window, $location, getPlayList) {

  $scope.party = {
    name: $window.party.name || 'default',
    nowPlaying: {artist: 'Ozma', title: 'Domino Effect'}
  };
  //this asigns the respnse from the server to the queue variable
  $scope.queue = getPlayList.playList($scope.party.name);


  $scope.getNext = function(){
    var max = $scope.queue[0].score;
    var res = null;
    $scope.queue.forEach(function(song){
      if(song.score >= max && !song.played){
        res = song.uri
        song.played = true;
      }
    });
    return res;
  }
  $scope.url = '//www.youtube.com/embed/'+ $scope.getNext() + '?rel=0&autoplay=1';
  // [
  //   {artist: 'Weezer', title: 'Buddy Holly', score: 5},
  //   {artist: 'Nirvana', title: 'Smells Like Teen Spirit', score: 2},
  //   {artist: 'Justin Bieber', title: 'Baby', score: -3},
  //   {artist: 'Novos Baianos', title: 'Brasil Pandeiro', score: 15},
  // ];

});
party.factory('getPlayList', function($http){
  var playList = function(party){
    return $http({
      method: 'POST',
      url: '/api/getPlaylist',
      data: {name: party}
    })
    .then(function(res){
      return res.body;
    });
  };

  return {playList: playList}
});