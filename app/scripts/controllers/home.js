'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the projectsApp
 * */

angular.module('projectsApp')
  .controller('HomeCtrl', function ($scope, $firebaseAuth, $location, $timeout, $mdSidenav, $log, provisionSettings, $mdDialog, userService) {
    var ref = new Firebase('https://shining-torch-23.firebaseio.com/');
    var authObj = $firebaseAuth(ref);
    var authData = authObj.$getAuth();

    ref.child('users').child(authData.uid).once('value', function (snapshot) {
        var val = snapshot.val();
        val.uid = authData.uid;
        userService.setCurrentUser(val);
    });
    $scope.userCurrent = userService.getCurrentUser();
    $scope.user;

    if (authData) {
      console.log("Logged in as:", authData.uid);
    } else {
      console.log("Logged out");
    }

    $scope.upload = function(files) {
      console.log('uploading files!');
    }

    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle()
          .then(function(){
          $log.debug("toggle left is done");
          });
    };
    $scope.close = function() {
      $mdSidenav('left').close()
          .then(function(){
          $log.debug("close LEFT is done");
          });
    };

    var changeLocation = function(url, forceReload) {
      $location.path(url);
      $scope = $scope || angular.element(document).scope();
      if(forceReload || !$scope.$$phase) {
        $scope.$apply();
      }
    };

    $scope.goToSettings = function() {
      changeLocation('/settings')
    }
});
