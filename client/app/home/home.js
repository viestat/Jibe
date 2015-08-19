var home = angular.module('jibe.home', []);

home.controller('HomeController', function ($scope) {

  $scope.joinParty = function () {
    console.log('joining party');
  };
});