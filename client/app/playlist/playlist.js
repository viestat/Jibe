angular.module('jibe.playlist', [])

.controller('PlaylistCtrl', ['$scope', function PlaylistCtrl($scope) {

    $scope.selectSong = function(song) {
        // song.votes = 0;
        // console.log(song)
        // databaseInteraction.addSong(song).then(function(data) {
        //         $scope.playList = databaseInteraction.getQueue();
        //     })
        //     .catch(function(err) {
        //         console.error(err)
        //     })
    };

    $scope.upVote = function() {
        console.log('upvote');

    };
    $scope.downVote = function() {
        console.log('downvote');
    };

    $scope.shareCollapse = false;

    $scope.playlistName = 'Metallic Gazelle';
    $scope.playlistLink = 'https://jibe.io/smitten-kitten';
    $scope.currentSong = {
        name: 'No Sleep',
        artist: 'Janet Jackson featuring Susan Sarandon',
        upvotes: 101,
        downvotes: 35,
        artwork: "assets/img/now-playing-img.jpg"
    };

    $scope.queue = [
        {
            name: "Haunted",
            artist: "Beyonce",
            upvotes: 14,
            downvotes: 80,
            artwork: "assets/img/now-playing-img.jpg",
            nominatedBy: "Susan Sarandon",
            isCollapsed: true,
            upvoters:[
                {
                    name: 'User1',
                    photo: 'assets/img/user1.jpg'
                },
                {
                    name: 'User2',
                    photo: 'assets/img/user2.jpg'
                },
                {
                    name: 'User3',
                    photo: 'assets/img/user3.jpg'
                },
                {
                    name: 'User4',
                    photo: 'assets/img/user4.jpg'
                },
                {
                    name: 'User5',
                    photo: 'assets/img/user5.jpg'
                },
                {
                    name: 'User6',
                    photo: 'assets/img/user6.jpg'
                }
            ],
            downvoters:[
                {
                    name: 'User7',
                    photo: 'assets/img/user7.jpg'
                },
                {
                    name: 'User8',
                    photo: 'assets/img/user8.jpg'
                },
                {
                    name: 'User9',
                    photo: 'assets/img/user9.jpg'
                },
                {
                    name: 'User10',
                    photo: 'assets/img/user10.jpg'
                },
                {
                    name: 'User11',
                    photo: 'assets/img/user11.jpg'
                },
                {
                    name: 'User12',
                    photo: 'assets/img/user12.jpg'
                }
            ]
        },
        {
            name: "Hang With Me",
            artist: "Robyn",
            upvotes: 20,
            downvotes: 300,
            artwork: "assets/img/expanded-artwork-img.jpg",
            nominatedBy: "Ben Biran",
            isCollapsed: true,
            upvoters:[],
            downvoters:[]
        }
    ];

    $scope.expanded = $scope.queue[1];

    $scope.collapse = function() {
        this.isExpanded  = !this.isExpanded;
    };

}]);