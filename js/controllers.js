angular.module('djBooth.controllers', [])
    // controller for handling the search function

    .filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
})
    .controller('searchController', function($scope, $window, searchSpotify) {

        // the results array that houses the songs currently in the queue
        $scope.playList = [{
            songname: 'Semi-Charmed Life',
            artist: 'Third Eye Blind',
            votes: 3
        }, {
            songname: 'Tubthumping',
            artist: 'Chumbawamba',
            votes: 0
        }];

        $scope.results =[{
            songname: 'Semi-Charmed Life',
            artist: 'Third Eye Blind',
            votes: 3
        }, {
            songname: 'Tubthumping',
            artist: 'Chumbawamba',
            votes: 0
        }]
        $scope.result =[]
        //this function adds whichever song is clicked in the search field to the playlist 
        $scope.getSongs = function(reqString) {
          console.log(reqString)
          searchSpotify.getData(reqString).then(function(data){
            $scope.results = data;
          })
          .catch(function(err){
            console.error(err)
          })

          }
          $scope.selectSong = function(data){

            console.log(data)
          }
            // searchSpotify.getData(data)


                // the data will also need to be added to the db
                // we should probably not even have a $scope.results but actually just post this to the db via the server
                // on success to posting to the db we should do a get request and update the users view
  

        $scope.upVote = function() {
          console.log('upvote')

        }
        $scope.downVote = function() {
          console.log('downvote')
        }

    })
    // this is where the search field updates with data from spotify as you type, obviously this is not implemented and 
    // is placeholder code
