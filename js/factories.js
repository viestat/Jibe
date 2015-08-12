angular.module('djBooth.factories', [])
.factory('searchSpotify', function ($http){
  // this is our factory function for getting data from spotify, this will be run when we type in the search field
  var getData = function(data){

    // Take user submitted search string from input field, split
    // into separate words and rejoin w/ proper delimiter
    var searchTerms = data.split(" ");
    var searchQuery = searchTerms.join("+");

    // Base url plus search query start, search query will be added on to this
    var base_url = "https://api.spotify.com/v1/search?q=";
    // Since we will always be using the same type filter, market filter, and 
    // search result limit, can combine all into one suffix url
    var url_suffix = "&type=track&market=US&limit=10";

    // Combine base, search, and suffix into complete search query url
    var uri = base_url + searchQuery + url_suffix;

    return $http({
      method: 'GET',
      url: uri,
      Accept: "application/json"
    })
    .then(function(resp){
      var searchResults = resp.data;
    
      // Limit = # of search results per page, returned from spotify
      var limit = searchResults["tracks"]["limit"];
      // Array of track objects from search
      var items = searchResults["tracks"]["items"];

      var results = [];

      // Iterate through search results, 
      _.each(items, function(item){
        var entry = {
          "song_name": item["name"],
          "artists": [],
          "album_name": item["album"]["name"],
          "image": item["album"]["images"][2]["url"],
          "duration_ms": item["duration_ms"],
          "popularity": item["popularity"],
          "preview_url": item["preview_url"],
          "spotifyId": item["uri"]
        };
        _.each(item["artists"], function(artist){
          entry["artists"].push(artist["name"]);
        });
        console.log(entry)
        results.push(entry);
      });

      return results;
    })
  };

  return {
    getData: getData,
  }
})
.factory('databaseInteraction', function($http){

// this is our get request for our db for the current playlist in the room
// this will be called when a user loads the room and whenever a succesful post request occurs to the db (so 
// the user can see the updated playlist when after they add somethng to it)
var getQueue = function($http){
  // return $http({
  //   method: 'GET',
  //   url: 'OUR DB'
  // })
  // .then(function(resp){
  //   return resp.data
  // })
  // SAMPLE DATA FOR TESTING
  return [
  {'song_name': 'Skin Deep', 'artists': ["Dusky"], 'spotifyId': '75kWsM3OTYyQYiEoWYAzH1'},
  {'song_name': 'Simple Love', 'artists': ["Julio Bashmore"], 'spotifyId': '4grMB5gbgfMh6kUGmo45yf'}];
};

// this is the post request for adding songs to our db and essentially the queue this is placeholder code
  var addSong = function(songData){
      return $http({
      method: 'POST',
      url: 'OUR DB',
      data: songData
    })
  };

  // GET request for retrieving host's Spotify user_id from our database
  // available once they authenticate
  var getUserId = function($http){
    return $http({
      method: 'GET',
      url: 'OUR DB'
    })
    .then(function(resp){
      return resp.data.userSpotifyId;
    })
  };

  return {
    getQueue: getQueue,
    addSong: addSong,
    getUserId: getUserId
  }

})
// This factory will handle playlist creation, adding songs, and reordering them
.factory('spotifyPlaylistMgr', function($http, databaseInteraction){
  
  // Grab user's spotify id for post request
  var userSpotifyId = databaseInteraction.getUserId();
  var uri = 'https://api.spotify.com/v1/users/'+'robbyhays'/*userSpotifyId*/+'/playlists';
  
  // auth token from Robby's spotify for testing purposes --> will need to be replaced with
  // user's auth token from authentication
  var myToken = 'BQC6DciJdcfuCjygLrrIc1gttp6fwEK14QGa6AHf1oAbQCkoNi5-FFoQ1Hz8PAQkKVDIK3J0rCjs4Wh7m8rz6nvuMrBJOUrXy40Ul6oDglMuRA33OTN4_H_yvJdacCaYLDSZsre8Roa7ylMWJdrIrRStCxQDsfx0m0qS5EX3saZnD38qPyEj9-9nE13uxOXP8fI_noDWy0ZkiOfkM2PiuW8GIDNmuPJykA2hp3akXvEtGMa8c7PUSj6ff734nhR5s3wrmwXuMyhqER2X9VB60916lSf3kIQF3JreyrM_sUZdTg';
  var initializePlaylist = function($http){
    return $http({
      method: 'POST',
      url: uri,
      Accept: 'application/json',
      Authorization: 'Bearer ' + myToken,
      data: {
        'name': 'JibeTestPlaylist1',
        'public': 'true'
      }
    })
  };

  return {
    initializePlaylist: initializePlaylist
  }
})
