'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the projectsApp
 * */
 angular.module('projectsApp')
 .controller('SearchCtrl', function ($scope, $timeout, firebaseService) {

    $scope.filterFunction = function(element) {
      //return element.name.match(/^T/) ? true : false;
      return true
    };
    $scope.selectedProfile = {};
    $scope.input = '';
    $scope.loaded = false;
    $scope.profiles = [];

    var ref = new Firebase(firebaseService.getFirebBaseURL());

    $scope.loadProfiles = function(){
      ref.child('profileInfo').once('value', function (snapshot) {
        console.log('...fetch users...');
        snapshot.forEach(function(child) {
          var key = child.key();
          var val = child.val();
          var profile = {};
          profile.key = key;
          profile.val = val;
          $scope.profiles.push(profile);
        })
      });
    };

    $scope.searchProfiles = function(name){
      if(!$scope.loaded){
        //$scope.loadProfiles().then(function(profiles){
        $scope.loadProfiles();
        //console.log('queried profiles: ', $scope.profiles);
        $scope.loaded = true;
      }
    };

  }).directive('keyboardPoster', function($parse, $timeout){
  var DELAY_TIME_BEFORE_POSTING = 0;
  return function(scope, elem, attrs) {
    
    var element = angular.element(elem)[0];
    var currentTimeout = null;
   
    element.oninput = function() {
      var model = $parse(attrs.postFunction);
      var poster = model(scope);
      
      if(currentTimeout) {
        $timeout.cancel(currentTimeout)
      }
      currentTimeout = $timeout(function(){
           poster(angular.element(element).val());
          
      }, DELAY_TIME_BEFORE_POSTING)
    }
  }
})