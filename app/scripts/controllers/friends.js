'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectsApp
**/
angular.module('projectsApp')
.controller('UsersController',  function($scope, $http, $firebaseAuth, $firebaseArray, $firebaseObject , firebaseService, profileService) {
  var ref = new Firebase(firebaseService.getFirebBaseURL());
  var authObj = $firebaseAuth(ref);
  var authData = authObj.$getAuth();
  console.log("Logged in as:", authData.uid);

  var ref = new Firebase("https://shining-torch-23.firebaseio.com/friends/"+ authData.uid);
  $scope.messages = $firebaseArray(ref);

  var list = $firebaseArray(ref);
  var friendProfile = [];
  list.$loaded(
  function(x) {
    x === list; // true
    console.log(x);
    x.forEach(function(entry) {
     getUserProfileInfo(entry.uid);
     console.log(entry.uid);
    });
    }, function(error) {
    console.error("Error:", error);
  });

  $scope.addFriend = function(useruid) {
    var userID = useruid;
    $scope.messages.$add({
      uid: userID
    });
  };

  var getUserProfileInfo = function(userid){
    var userID = userid;
    var ref = new Firebase("https://shining-torch-23.firebaseio.com/profileInfo/"+ userID);
    var profileData = $firebaseObject(ref);
    profileData.$loaded(
      function(data) {
        friendProfile.push(data);
      },
      function(error) {
        console.error("Error:", error);
      }
    );
    $scope.friendProfiles = friendProfile;
  }

  var profileRef = new Firebase("https://shining-torch-23.firebaseio.com/profileInfo/");
  $scope.allProfiles = $firebaseArray(profileRef);

  $scope.currentPage = 1;
  $scope.pageSize = 5;

  $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };

   $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
})

angular.module('projectsApp')
.controller('OtherController', function($scope, $http) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
});
