angular.module('djBooth.factories', [])
.factory('searchSpotify', function ($http){
  // this is our factory function for getting data from spotify, this will be run when we type in the search field
  var getData = function(){
    return $http({
      method: 'GET',
      url: 'www.Spotify.com'
    })
    .then(function(resp){
      return resp.data
    })
  }

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
}

// this is the post request for adding songs to our db and essentially the queue this is placeholder code
  var addSong = function(songData){
      return $http({
      method: 'POST',
      url: 'OUR DB',
      data: songData
    })
  }

  return {
    addSong: addSong,
  }

})