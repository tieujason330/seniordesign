'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp')
  .controller('UserCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
