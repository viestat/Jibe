angular.module('djBooth.factories', [])
.factory('searchSpotify', function ($http){
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
    getData: getData
  }
})