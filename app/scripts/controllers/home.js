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

    var getProvision = function(callback) {
      var provision = provisionSettings.getUserProvision(callback);
    };

    var showAboutForm = function(provision) {
      if (provision == '0') {
        $mdDialog.show({
          controller: MoreInfoController,
          templateUrl: 'views/about.tmpl.html'
        })
        function MoreInfoController($scope, $mdDialog) {
          $scope.hideMoreInfo = function(user) {
            console.log('hiding more info...');
            $mdDialog.hide();
            provisionSettings.setUserProvision();
            saveMoreInfo(user);
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
            provisionSettings.setUserProvision();
          };
        }
      }
    };

    getProvision(showAboutForm);

    if (authData) {
      console.log("Logged in as:", authData.uid);
    } else {
      console.log("Logged out");
    }

    $scope.updateProvision = function() {
      provisionSettings.setUserProvision();
    }

    var saveMoreInfo= function(user) {
      console.log('saving more info...');
      if(user !== undefined ){
        console.log(user);  
        // update the user with additional info that was submitted  
        if(user.birthday !== undefined){
          ref.child('users').child(authData.uid).update({
            birthday: user.birthday
          });
        }

        if(user.school !== undefined){
          ref.child('users').child(authData.uid).update({
            school: user.school
          });
        }

        if(user.movies !== undefined){
          ref.child('users').child(authData.uid).update({
            movies: user.movies
          });
        }

        if(user.music !== undefined){
          ref.child('users').child(authData.uid).update({
            music: user.music
          });
        }

        if(user.picture !== undefined){
          ref.child('users').child(authData.uid).update({
            picture: user.picture
          });
        }
      }
    };
    
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
