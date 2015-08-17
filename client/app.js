app = angular.module('Playlist', []);


app.controller('PlaylistCtrl', ['$scope', function($scope){
    
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


app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

app.controller('MyCtrl', ['$scope', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
}]);


$(document).ready(function () {
    
    
    $("#share-open").click(function(){
        $('#overlay-share').css('visibility','visible');
    });
    
    $("#share-close").click(function(){
        $('#overlay-share').css('visibility','hidden');
    });
    
    
    (function ($) {

        $('#filter').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
            $('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        })
        
        

    }(jQuery));

});

