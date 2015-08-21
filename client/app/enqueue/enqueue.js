var enqueue = angular.module('grizzly.enqueue', ['ngTable', 'grizzly.services']);

enqueue.controller('EnqueueController', function ($scope, $window, searchYouTube, addToQueue) {

  // the results array that houses the songs currently in the queue
  $scope.results = [];

  $scope.$back = function() { 
    window.history.back();
  };
  
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * Author: Metallic Gazelle
  * Edited by: Nate Meier
  * Description: This function uses the searchYouTube factory to poll the 
  *              YouTube API for videos that match the 'reqString'. It saves
  *              the response in a $scope variable named results, which is 
  *              used to render YouTube videos on the enqueue.html page.
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  $scope.getSongs = function(reqString) {
    searchYouTube.getData(reqString)
      .then(function(data) {
        $scope.results = data;
      })
      .catch(function(err) {
        console.error(err);
      });
  };

  $scope.addSong = function(song){
    //song lokks like this: {
    //  title: "Nujabes - The Final View", 
    //  uri: "36F9LKMDaOY", 
    //  $$hashKey: "object:250"
    // }
    song.party = $window.localStorage.party;
    addToQueue.sendSong(song);
  };


  console.log($scope.results);

});

enqueue.factory('searchYouTube', function ($http) {
  // this is our factory function for getting data from youtube, this will be run when we type in the search field
  var getData = function(data) {
    // Take user submitted search string from input field, split
    // into separate words and rejoin w/ proper delimiter
    var searchTerms = data.split(' ');
    var searchQuery = searchTerms.join('+');

    // Base url plus search query start, search query will be added on to this
    // var base_url = 'https://api.spotify.com/v1/search?q=';
    // Since we will always be using the same type filter, market filter, and
    // search result limit, can combine all into one suffix url
    // var url_suffix = '&type=track&market=US&limit=10';

    // Combine base, search, and suffix into complete search query url
    // var uri = base_url + searchQuery + url_suffix;

    return $http({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search?part=id%2C+snippet&q=' + searchQuery + '&type=video' + '&videoEmbeddable=true' + '&videoCaption=closedCaption' + '&maxResults=20' +'&key=AIzaSyCozCGD6I5g-mOcT7xL8KCQ97GUlCIMj3w',
      })
      .then(function(resp) {
        var searchResults = resp.data.items;
        // Limit = # of search results per page, returned from spotify
        // var limit = searchResults['tracks']['limit'];
        // Array of track objects from search
        // var items = searchResults['tracks']['items'];
        var results = [];
        // Iterate through search results,
        _.each(searchResults, function(item) {
          var entry = {
            'title': item.snippet.title,
            'uri': item.id.videoId
          };
          _.each(item['artists'], function(artist) {
              entry['artists'].push(artist['name']);
          });

          results.push(entry);
        });
        return results;
      });
  };

  return {
    getData: getData,
  };
});

enqueue.factory('addToQueue', function($http){
  var sendSong = function(song){
    return $http({
      method: 'POST',
      url: '/api/addSong',
      data: song
    });
  };

  return {sendSong: sendSong}

});
