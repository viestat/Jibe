angular.module('djBooth.controllers', [])
// controller for handling the search function
.controller('searchController', function ($scope, $window, searchSpotify){
  $scope.results = [{'songname': 'semi-charmed life', 'votes':  3}];

  $scope.getResults= function(){
    SearchSpotify.getData($scope.song, function(data){
      $scope.results.push(data);
    })
  }

})