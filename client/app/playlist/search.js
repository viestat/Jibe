angular.module('jibe.playlist.search', [])

.controller('SearchCtrl', ['$scope', function SearchCtrl($scope, $window, searchSpotify) {

  // the results array that houses the songs currently in the queue

  $scope.results = [];
  $scope.result = [];
      //this function adds whichever song is clicked in the search field to the playlist

  $scope.getSongs = function(reqString) {
      searchSpotify.getData(reqString)
        .then(function(data) {
          $scope.results = data;
        })
        .catch(function(err) {
          console.error(err);
        });
  };

  $scope.selectSong = function(data){
    data.votes = 0;
    data.id = Math.random();
    console.log(data);
    $scope.playList.push(data);
  };
  // searchSpotify.getData(data)


      // the data will also need to be added to the db
      // we should probably not even have a $scope.results but actually just post this to the db via the server
      // on success to posting to the db we should do a get request and update the users view


  $scope.upVote = function() {
    console.log('upvote');

  };

  $scope.downVote = function() {
    console.log('downvote');
  };

  // the data will also need to be added to the db
  // we should probably not even have a $scope.results but actually just post this to the db via the server
  // on success to posting to the db we should do a get request and update the users view

}]);
