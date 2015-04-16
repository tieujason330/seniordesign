'use strict';

/**
 * @ngdoc service
 * @name projectsApp.userService
 * @description
 * # userService
 * Service in the projectsApp.
 */
// AngularJS will instantiate a singleton by calling "new" on this function
angular.module('projectsApp')
  .factory('userService', function () {
    var user;
    return {
      setCurrentUser: function(current_user) {
        user = current_user;
        console.log('User Factory init: '+user);
      },
      getCurrentUser: function() {
        return user;
      }
    };
  });