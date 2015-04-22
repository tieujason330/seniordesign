'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the projectsApp
 * */

angular.module('projectsApp')
  .controller('HomeCtrl', function ($scope, $firebaseAuth, $location, $timeout, $mdSidenav, $log, provisionSettings, $mdDialog) {
    var ref = new Firebase('https://shining-torch-23.firebaseio.com/');
    var authObj = $firebaseAuth(ref);
    var authData = authObj.$getAuth();

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
          $scope.hideMoreInfo = function() {
            $mdDialog.hide();
            provisionSettings.setUserProvision();
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
