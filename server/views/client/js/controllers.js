angular.module('djBooth.controllers', [])
    // controller for handling the search function

.controller('searchController', function($scope, $window, searchSpotify) {

        // the results array that houses the songs currently in the queue


        $scope.results = []
        $scope.result = []
            //this function adds whichever song is clicked in the search field to the playlist 

        $scope.getSongs = function(reqString) {
            searchSpotify.getData(reqString).then(function(data) {
                    $scope.results = data;
                })
                .catch(function(err) {
                    console.error(err)
                })

        }



        // the data will also need to be added to the db
        // we should probably not even have a $scope.results but actually just post this to the db via the server
        // on success to posting to the db we should do a get request and update the users view




    })
    .controller('playListController', function($scope, $window, $location, playlistDatabase) {
        $scope.playList = [];
        $scope.selectSong = function(song) {
            song.votes = 0;
            playlistDatabase.addSong(song).then(function(data) {
                    $scope.playList = playlistDatabase.getQueue();
                })
                .catch(function(err) {
                    console.error(err)
                })
        }

        $scope.newQueue = function(reqData){
            playlistDatabase.createQueue(reqData).then(function(data){                
                console.log(data.data);
                // $location.path('/host')
            
            })
        }

        $scope.upVote = function() {
            console.log('upvote')

        }
        $scope.downVote = function() {
            console.log('downvote')
        }
    })
    // .controller('signUpController', function($scope, $window, userDatabase) {
    //     $scope.signUp = function() {
    //         var userInfo = {
    //             username: 'max1',
    //             password: '123'
    //         };
    //         userDatabase.signUp(userInfo).then(function(data) {
    //             console.log('HERE IS THE DATA!!!', data);
    //         })
    //     }
    //     $scope.signIn = function() {
    //         var userInfo = {
    //             username: 'max1',
    //             password: '123'
    //         };
    //         userDatabase.signIn(userInfo).then(function(data) {
    //             console.log('STUFF', data);
    //         })
    //     }
    // });
// this is where the search field updates with data from spotify as you type, obviously this is not implemented and 
// is placeholder code

// This controller manages the spotify player widget (playing next song in queue)
// .controller('playerController', function($scope, $window, databaseInteraction){
//   // retrieve the queue, which will be an array of objects
//   var queue = databaseInteraction.getQueue;

//   var currentSongIdx = 0;
//   // grab uri of first song in queue
//   if (queue.length > 0){
//     $scope.uri = queue[currentSongIdx]["uri"];
//   } else {
//     console.log("Empty Queue");
//   }

//   $scope.playNext = function(){
//     currentSongIdx++;
//     $scope.uri = queue[currentSongIdx]["uri"];
//     $("#widget").contents().find("div.play-pause-btn").click();
//   };


// })
