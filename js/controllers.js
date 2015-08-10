angular.module('djBooth.controllers', [])
// controller for handling the search function
.controller('searchController', function ($scope, $window, searchSpotify){

  // the results array that houses the songs currently in the queue
  $scope.results = [{songname: 'Semi-Charmed Life', artist:'Third Eye Blind', votes:  3}, 
  {songname: 'Tubthumping', artist:'Chumbawamba', votes: 0 }];
  //this function adds whichever song is clicked in the search field to the playlist 
  $scope.getSong = function(data){
    $scope.results.push(data)
    // the data will also need to be added to the db
    // we should probably not even have a $scope.results but actually just post this to the db via the server
    // on success to posting to the db we should do a get request and update the users view
    })
  }

})
// this is where the search field updates with data from spotify as you type, obviously this is not implemented and 
// is placeholder code
.directive('updateSearch', function(){
  return {
    link : function(scope, elem, attrs){
          SearchSpotify.getData($scope.song, function(data){
          // get the data from the server and add elements to the search dropdown so the user can select them
          // 
    })
      console.log('hi');
    }
  }
  
})
