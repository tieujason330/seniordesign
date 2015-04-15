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
    $scope.genToolbox = function(){
      console.log('spinning settings...');


    //$scope.edit = function(){
    //  userEdit.$push({
    //    email: $scope.emailEdit
    //  });
    //}

    };

  });
