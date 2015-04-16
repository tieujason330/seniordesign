'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp')
  .controller('SettingsCtrl', function ($scope) {
   //Firebase URL
    var URL = 'https://shining-torch-23.firebaseio.com/';
    //Initialize Firebase
    var ref = new Firebase(URL+'/users');
    //Defaults
    $scope.firstName = "Matt";
    $scope.lastName = "Utha";
    $scope.email="matt-utha-was-here";

  });
