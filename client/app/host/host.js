var host = angular.module('grizzly.host', []);

host.controller('HostController', function ($scope, $window, HostServices) {
  $scope.disabled = false;

  $scope.party = {
    name: $window.party.name,
    isDisabled: $window.party.isDisabled
  };

  $scope.nameParty = function (name) {
    console.log('naming party:', name);
    $scope.disabled = true;
    $window.party.name = name;
    $window.party.isDisabled = true;
  };

  $scope.startParty = function () {
    console.log('Start party, controller.');
    HostServices.startParty();
  };

  $scope.resetStorage = function () {
    console.log('reset storage');
    $window.localStorage.setItem(party.name, "");
    $window.localStorage.setItem(party.isDisabled, false);
    $scope.disabled = false;
  };

});

host.factory('HostServices', function ($http, $window) {

  var startParty = function () {
    console.log('Start party, factory.');

    return $http({
      method: 'POST',
      url: '/api/startParty',
      data: $window.party.name
    });
  };

  return {
    startParty: startParty
  };

});
// I don't know what any of this does -- Nate Meier
// host.directive('modalDialog', function() {
//   return {
//     restrict: 'E',
//     scope: {
//       show: '='
//     },
//     replace: true, // Replace with the template below
//     transclude: true, // we want to insert custom content inside the directive
//     link: function(scope, element, attrs) {
//       scope.dialogStyle = {};
//       if (attrs.width)
//         scope.dialogStyle.width = attrs.width;
//       if (attrs.height)
//         scope.dialogStyle.height = attrs.height;
//       scope.hideModal = function() {
//         scope.show = false;
//       };
//     },
//     template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
//   };
// });
