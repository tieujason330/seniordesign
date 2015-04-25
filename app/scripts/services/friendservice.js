'use strict';
//this factory returns information about users and their friends
angular.module('projectsApp')
  .factory('friendService', function (firebaseService) {
    var user;
    return {
      setCurrentUser: function(val) {
        user = val;
      },
      getCurrentUser: function() {
        return user;
      },
      updateKey: function(key, value){
        user.key = value;
        return user;
      }
    }
  })