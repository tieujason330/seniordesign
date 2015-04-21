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
  .factory('userService', function (firebaseService) {
    var user;
    return {
      setCurrentUser: function(val) {
        user = val;
      },
      getCurrentUser: function() {
        console.log(user);
        return user;
      },
      updateKey: function(key, value){
        user.key = value;
        return user;
      }
    };
  })
  .factory('provisionSettings', function ($firebaseAuth) {
  	var firebaseURL = 'https://shining-torch-23.firebaseio.com/';
    var ref = new Firebase(firebaseURL);
    var authObj = $firebaseAuth(ref);
    var authData = authObj.$getAuth();

    return {
      getUserProvision: function() {
        var provisionedData = ref.child('users').child(authData.uid).child('provisioned').once('value', function (snapshot) {
          var val = snapshot.val();
          console.log(val);
          return val;
        });
      },
      setUserProvision: function() {
        var provisionedData = ref.child('users').child(authData.uid);
        provisionedData.update({
          provisioned: 1
        });
      }
    };
  });
