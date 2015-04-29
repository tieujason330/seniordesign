'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectsApp


Use controllers to:

1. Set up the initial state of the $scope object.
2. Add behavior to the $scope object.

Do not use controllers to:
1. Manipulate DOM — Controllers should contain only business logic. Putting any presentation logic into Controllers significantly affects its testability. Angular has databinding for most cases and directives to encapsulate manual DOM manipulation.
2. Format input — Use angular form controls instead.
3. Filter output — Use angular filters instead.
4. Share code or state across controllers — Use angular services instead.
5. Manage the life-cycle of other components (for example, to create service instances).
**/
angular.module('projectsApp')
.controller('UsersController',  function($scope, $http, $firebaseAuth, $firebaseArray, $firebaseObject , firebaseService, profileService) {
  var ref = new Firebase(firebaseService.getFirebBaseURL());
  var authObj = $firebaseAuth(ref);
  var authData = authObj.$getAuth();
  console.log("Logged in as:", authData.uid);

  // ref.once("value", function(data) {
  //   friendList = data.val();
  //   var friendRef = new Firebase("https://shining-torch-23.firebaseio.com/profileInfo/");
  //   $scope.profile = $firebaseObject(friendRef.child(friendList));
  //   //console.log($scope.profile);
  // });

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
  $scope.data;

  var getUserProfileInfo = function(userid){
    var userID = userid;
    console.log("entered");
    var ref = new Firebase("https://shining-torch-23.firebaseio.com/profileInfo/"+ userID);
    var profileData = $firebaseObject(ref);
    profileData.$loaded(
      function(data) {
        console.log(data.name); // true
        friendProfile.push(data);
      },
      function(error) {
        console.error("Error:", error);
      }
    );
    console.log(profileData);
    $scope.friendProfiles = friendProfile;
    console.log("end");
  }

  var profileRef = new Firebase("https://shining-torch-23.firebaseio.com/profileInfo/");
  $scope.allProfiles = $firebaseArray(profileRef);

  $scope.currentPage = 1;
  $scope.pageSize = 20;
  $scope.meals = [];

  var dishes = [
    'noodles',
    'sausage',
    'beans on toast',
    'cheeseburger',
    'battered mars bar',
    'crisp butty',
    'yorkshire pudding',
    'wiener schnitzel',
    'sauerkraut mit ei',
    'salad',
    'onion soup',
    'bak choi',
    'avacado maki'
  ];

  var sides = [
    'with chips',
    'a la king',
    'drizzled with cheese sauce',
    'with a side salad',
    'on toast',
    'with ketchup',
    'on a bed of cabbage',
    'wrapped in streaky bacon',
    'on a stick with cheese',
    'in pitta bread'
  ];

  for (var i = 1; i <= 100; i++) {
    var dish = dishes[Math.floor(Math.random() * dishes.length)];
    var side = sides[Math.floor(Math.random() * sides.length)];
    $scope.meals.push('meal ' + i + ': ' + dish + ' ' + side);
  }

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
