'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp')
  .controller('SettingsCtrl', function ($scope, userService) {
   //Current User Factory
   $scope.user = userService.getCurrentUser();
   

  });
