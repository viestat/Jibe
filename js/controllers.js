angular.module('djBooth.controllers', [])
// controller for handling the search function
.controller('searchController', function ($scope, $window, searchSpotify){

  // the results array that houses the songs currently in the queue
  $scope.results = [{songname: 'semi-charmed life', votes:  3}];
  // this function calls the getData function in the SearchSpotify factory and returns the selected song
  // this song is then added to the queue
  $scope.getSong = function(){
    SearchSpotify.getData($scope.song, function(data){
      data.votes = 0;
      $scope.results.push(data);
    })
  }

})
.directive('updateSearch', function(){
  return {
    link : function(scope, elem, attrs){
      console.log('hi');
    }
  }
  
})