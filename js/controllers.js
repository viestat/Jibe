angular.module('djBooth.controllers', [])
    // controller for handling the search function
    .controller('searchController', function($scope, $window, searchSpotify) {

        // the results array that houses the songs currently in the queue
        // $scope.results = [{
        //     songname: 'Semi-Charmed Life',
        //     artist: 'Third Eye Blind',
        //     votes: 3
        // }, {
        //     songname: 'Tubthumping',
        //     artist: 'Chumbawamba',
        //     votes: 0
        // }];

        $scope.results =['Semi-Charmed life', 'Tubthumping']
        //this function adds whichever song is clicked in the search field to the playlist 
        $scope.getSong = function(data) {
            // searchSpotify.getData(data)


            console.log(data)
                // the data will also need to be added to the db
                // we should probably not even have a $scope.results but actually just post this to the db via the server
                // on success to posting to the db we should do a get request and update the users view
        }
  

        $scope.upVote = function() {

        }
        $scope.downVote = function() {

        }

    })
    // this is where the search field updates with data from spotify as you type, obviously this is not implemented and 
    // is placeholder code
