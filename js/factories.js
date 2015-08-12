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
    return $http({
      method: 'GET',
      url: 'OUR DB'
    })
    .then(function(resp){
      return resp.data
    })
  };

  // this is the post request for adding songs to our db and essentially the queue this is placeholder code
  var addSong = function(songData){
      return $http({
      method: 'POST',
      url: 'OUR DB',
      data: songData
    })
  };

  // GET request for retrieving host's Spotify user_id, oauth token,
  // and event's playlist Id from our database
  var getIdentifiers = function($http){
    return $http({
      method: 'GET',
      url: 'OUR DB'
    })
    .then(function(resp){
      return {
        userSpotifyId: resp.data.userSpotifyId,
        eventId: resp.data._id,
        eventName: resp.data.eventName,
        userToken: resp.data.userToken
      };
    })
  };

  return {
    getQueue: getQueue,
    addSong: addSong,
    getIdentifiers: getIdentifiers
  }

})
// This factory will handle playlist creation, adding songs, and reordering them
.factory('spotifyPlaylistMgr', function($http, databaseInteraction){
  
  // Grab identifying info for user and event (playlist)
  var userSpotifyId = databaseInteraction.getIdentifiers().userSpotifyId;
  var eventId = databaseInteraction.getIdentifiers().eventId;
  var eventName = databaseInteraction.getIdentifiers().eventName;
  var userToken = databaseInteraction.getIdentifiers().userToken;

  // uri for creating playlist
  var uri = 'https://api.spotify.com/v1/users/'+userSpotifyId+'/playlists/';
  // uri for accessing/modifying playlist
  var playlistUri = uri + eventId;
  
  // auth token (all permissions) from Robby's spotify for testing purposes
  var myToken = 'BQC6DciJdcfuCjygLrrIc1gttp6fwEK14QGa6AHf1oAbQCkoNi5-FFoQ1Hz8PAQkKVDIK3J0rCjs4Wh7m8rz6nvuMrBJOUrXy40Ul6oDglMuRA33OTN4_H_yvJdacCaYLDSZsre8Roa7ylMWJdrIrRStCxQDsfx0m0qS5EX3saZnD38qPyEj9-9nE13uxOXP8fI_noDWy0ZkiOfkM2PiuW8GIDNmuPJykA2hp3akXvEtGMa8c7PUSj6ff734nhR5s3wrmwXuMyhqER2X9VB60916lSf3kIQF3JreyrM_sUZdTg';
  
  // This function checks to see if playlist for room ID exists yet,
  // and initializes new playlist if it does not
  var checkForPlaylist = function($http){
    // send a GET request to spotify with user ID and event playlist ID
      // if response is 404, playlist does not exist yet and needs to be created
    return $http({
      method: 'GET',
      url: playlistUri,
      Accept: 'application/json',
      Authorization: 'Bearer ' + userToken;
    })
    .then(function(resp){
      if (resp.data.hasOwnProperty("error") && resp.data["error"]["status"] === 404){
        initializePlaylist();
      }
      return resp.data;
    })
  };

  // This function initializes a new playlist
  var initializePlaylist = function($http){
    return $http({
      method: 'POST',
      url: uri,
      Accept: 'application/json',
      Authorization: 'Bearer ' + userToken,
      data: {
        'name': 'JibeTestPlaylist1',
        'public': 'true'
      }
    })
    .then(function(resp){
      // return playlist_id of the newly created playlist
      return resp.data.id;
    })
  };

  return {
    initializePlaylist: initializePlaylist
  }
})
