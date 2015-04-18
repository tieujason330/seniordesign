'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:ToolboxCtrl
 * @description
 * # ToolboxCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp')
  .controller('ToolboxCtrl', function ($scope) {
   //Firebase URL
    var URL = 'https://shining-torch-23.firebaseio.com/';
    //Initialize Firebase
    var ref = new Firebase(URL+'/users');
    $scope.genToolbox = function(){
      console.log('spinning toolbox...');


    //$scope.edit = function(){
    //  userEdit.$push({
    //    email: $scope.emailEdit
    //  });
    //}

    };

  });
