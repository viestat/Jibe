var playlist = angular.module('grizzly.playlist', ['grizzly.services', 'ngTable']);

playlist.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  // Whitelist YouTube uri's
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.googleapis.com/youtube/v3/search?part=snippet&q=**',
    'http://www.youtube.com/embed/**',
  ]);
}]);

playlist.controller('PlaylistController', function ($scope, $window, $location, searchYouTube, playlistDatabase, videoVoting, $stateParams) {
  
  $scope.$back = function() { 
    window.history.back();
  };

  // // search functionality
  // $scope.modalShown = false;

  // $scope.toggleModal = function() {
  //   $scope.modalShown = !$scope.modalShown;
  // };

  // the results array that houses the songs currently in the queue
  $scope.results = [];
  $scope.result = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * Author: Metallic Gazelle
  * Edited by: Nate Meier
  * Description: This function uses the searchYouTube factory to poll the 
  *              YouTube API for videos that match the 'reqString'. It saves
  *              the response in a $scope variable named results, which is 
  *              used to render YouTube videos on the enqueue.html page.
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  $scope.getSongs = function(reqString) {
    searchYouTube.getData(reqString)
      .then(function(data) {
        $scope.results = data;
      })
      .catch(function(err) {
        console.error(err);
      });
  };

  // the data will also need to be added to the db
  // we should probably not even have a $scope.results but actually just post this to the db via the server
  // on success to posting to the db we should do a get request and update the users view
  $scope.playlist = [{
    artist: 'Katy Perry',
    title: 'Unconditionally',
    uri: 'XjwZAa2EjKA',
    $$hashKey: 'object:22',
    votes: 0,
    id: '12345'
  }, 
  {
    artist: 'Rick Astley',
    title: 'Never Gonna Give You Up',
    uri: 'XjwZAa2EjKA',
    $$hashKey: 'object:21',
    votes: 3,
    id: '12345'
  },
  {
    artist: 'David Rosson',
    title: 'Argle My Bargle',
    uri: 'XjwZAa2EjKA',
    $$hashKey: 'object:20',
    votes: 10,
    id: '12345'
  }];

  $scope.selectSong = function(song) {
    // console.log(song);
    playlistDatabase.addSong(song, $stateParams.playlistId)
      .then(function(data) {
        console.log(data);
        $scope.playlist = playlistDatabase.getQueue($stateParams.playlistId);
      });
  };

  $scope.ended = function() {
    console.log('ended from controller');
  };

  // Author: Nate Meier
  // Description: Used to upvote a song in the playlist
  $scope.upVote = function(song) {
    console.log('upvote test');
    songDatabase.upVote(song)
      .then(function(data) {
        console.log(data);
    });
  };

  // Author: Nate Meier
  // Description: Used to downvote a song in the playlist
  $scope.downVote = function(song) {
    console.log('downvote test');
    songDatabase.upVote(song)
      .then(function(data) {
        console.log(data);
    });
  };
});

// ----------------------------------------------------------------------------

// Author: Nate Meier
// I copied this from services.js to lump concerns. 
playlist.factory('videoVoting', function($http) {
  var upVote = function(videoId) {
    return $http({
      method: 'POST',
      url: '/api/upvote',
      data: {
        videoId: videoId
      },
      accept: 'application/json'
    });
  };

  var downVote = function(videoId) {
    console.log(videoId);
    return $http({
      method: 'POST',
      url: '/api/downvote',
      data: {
        videoId: videoId
      },
      accept: 'application/json'
    });
  };

  return {
    downVote: downVote,
    upVote: upVote
  };
});
// CONTROLLERS SHOULD POPULATE THE VIEW BASED ON THE FOLLOWING STRUCTURE

// $scope.playlistName = 'Metallic Gazelle';
// $scope.playlistLink = 'https://grizzly.io/smitten-kitten';
// $scope.currentSong = {
//     name: 'No Sleep',
//     artist: 'Janet Jackson featuring Susan Sarandon',
//     upvotes: 101,
//     downvotes: 35,
//     artwork: 'assets/img/now-playing-img.jpg'
// };

// $scope.queue = [
//     {
//         name: 'Haunted',
//         artist: 'Beyonce',
//         upvotes: 14,
//         downvotes: 80,
//         artwork: 'assets/img/now-playing-img.jpg',
//         nominatedBy: 'Susan Sarandon',
//         isCollapsed: true,
//         upvoters:[
//             {
//                 name: 'User1',
//                 photo: 'assets/img/user1.jpg'
//             },
//             {
//                 name: 'User2',
//                 photo: 'assets/img/user2.jpg'
//             },
//             {
//                 name: 'User3',
//                 photo: 'assets/img/user3.jpg'
//             },
//             {
//                 name: 'User4',
//                 photo: 'assets/img/user4.jpg'
//             },
//             {
//                 name: 'User5',
//                 photo: 'assets/img/user5.jpg'
//             },
//             {
//                 name: 'User6',
//                 photo: 'assets/img/user6.jpg'
//             }
//         ],
//         downvoters:[
//             {
//                 name: 'User7',
//                 photo: 'assets/img/user7.jpg'
//             },
//             {
//                 name: 'User8',
//                 photo: 'assets/img/user8.jpg'
//             },
//             {
//                 name: 'User9',
//                 photo: 'assets/img/user9.jpg'
//             },
//             {
//                 name: 'User10',
//                 photo: 'assets/img/user10.jpg'
//             },
//             {
//                 name: 'User11',
//                 photo: 'assets/img/user11.jpg'
//             },
//             {
//                 name: 'User12',
//                 photo: 'assets/img/user12.jpg'
//             }
//         ]
//     },
//     {
//         name: 'Hang With Me',
//         artist: 'Robyn',
//         upvotes: 20,
//         downvotes: 300,
//         artwork: 'assets/img/expanded-artwork-img.jpg',
//         nominatedBy: 'Ben Biran',
//         isCollapsed: true,
//         upvoters:[],
//         downvoters:[]
//     }
// ];

// $scope.expanded = $scope.queue[1];

// $scope.collapse = function() {
//     this.isExpanded  = !this.isExpanded;
// };

// ----------------------------------------------------------------------------
// Comment by Nate Meier
// I have no idea what any of this stuff does. We'll have to comb through it.

playlist.controller('YouTubeCtrl', function($scope, YT_event) {
  //initial settings
  $scope.yt = {
      width: 600,
      height: 480,
      videoid: 'M7lc1UVf-VE',
  };

  $scope.$on(YT_event.STATUS_CHANGE, function(event, data) {
    if (data === 'ENDED') {
      newVideo = function() {
          $scope.yt = {
              width: 600,
              height: 480,
              videoid: 'kL1aqfnIr2Y'
          };
      }();
    }
  });

});

playlist.directive('youtube', function($window, YT_event) {
        return {
            restrict: 'E',

            scope: {
                height: '@',
                width: '@',
                videoid: '@'
            },

            template: '<div></div>',

            link: function(scope, element) {
                var tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                var player;

                $window.onYouTubeIframeAPIReady = function() {

                    player = new YT.Player(element.children()[0], {
                        playerVars: {
                            autoplay: 1,
                            html5: 1,
                            theme: 'light',
                            modesbranding: 0,
                            color: 'white',
                            iv_load_policy: 3,
                            showinfo: 1,
                            controls: 1
                        },

                        height: scope.height,
                        width: scope.width,
                        videoId: scope.videoid,
                        events: {
                            onStateChange: function(event) {
                                console.log('STATUS CHANGED. New status: ' + event.data);
                                var message = {
                                    event: YT_event.STATUS_CHANGE,
                                    data: ''
                                };
                                switch (event.data) {
                                    case YT.PlayerState.PLAYING:
                                        message.data = 'PLAYING';
                                        break;
                                    case YT.PlayerState.ENDED:
                                        message.data = 'ENDED';
                                        break;
                                    case YT.PlayerState.UNSTARTED:
                                        message.data = 'NOT PLAYING';
                                        break;
                                    case YT.PlayerState.PAUSED:
                                        message.data = 'PAUSED';
                                        break;
                                }
                                scope.$apply(function() {
                                    scope.$emit(message.event, message.data);
                                });
                            }
                        }
                    });
                };

                scope.$watch('videoid', function(newValue, oldValue) {
                    if (newValue == oldValue) {
                        return;
                    }

                    player.cueVideoById(scope.videoid);

                });


                scope.$watch('height + width', function(newValue, oldValue) {
                    if (newValue == oldValue) {
                        return;
                    }

                    player.setSize(scope.width, scope.height);
                });
                scope.$on(YT_event.STOP, function() {
                    player.seekTo(0);
                    player.stopVideo();
                });

                scope.$on(YT_event.PLAY, function() {
                    player.playVideo();
                });

                scope.$on(YT_event.PAUSE, function() {
                    player.pauseVideo();
                });
            }

        };
    });

// We can probably delete this. We don't use it, and I think they meant "model."
// Every time I like at it I think of German. I kann nicht verstehen.
playlist.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
        show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width) {
        scope.dialogStyle.width = attrs.width;
      }
      if (attrs.height) {
        scope.dialogStyle.height = attrs.height;
      }
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});
