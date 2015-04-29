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

    console.log("hello");
  }, function(error) {
    console.error("Error:", error);
  });

  $scope.addFriend = function(useruid) {
    var userID = useruid;
    console.log('adding ' + userID + ' as friend');

    $scope.messages.$add({
      uid: userID
    });

    // add to pending list of requested friend only if the sender's uid isn't there
    var pendingRef = new Firebase("https://shining-torch-23.firebaseio.com/pending/"+ userID);
    var pendingObj = $firebaseObject(pendingRef);
    var senderID = authData.uid;

    pendingObj.$loaded()
      .then(function(data) {
        console.log(data === pendingObj); //true 
        
        var senderList = {};
        if (data.senderList !== undefined) {          
          senderList = data.senderList;
        }

        // TODO retrieve sender's full name 
        //var name = getUserFullName(senderID);
        //console.log(name);

        // update pendingTotal
        if (senderList[senderID] == undefined) {
          pendingRef.child('pendingTotal').transaction(function(current_value) {
            return (current_value || 0) + 1;
          }); 
        }

        // add to senderList
        senderList[senderID] = 'User\'s full name';

        // update Firebase endpoint      
        pendingRef.update({
          senderList: senderList
        });

      })
      .catch(function(error) {
        console.error("Error:", error);
      });
  };
  $scope.data;

  $scope.confirmFriend = function(useruid) {
    var senderID = useruid;
    console.log('confirming ' + senderID + ' as friend');

    var receiverID = authData.uid;
    var pendingRef = new Firebase("https://shining-torch-23.firebaseio.com/pending/"+ receiverID);
    var pendingObj = $firebaseObject(pendingRef);

    pendingObj.$loaded()
      .then(function(data) {
        console.log(data === pendingObj); //true 
        
        var senderList = {};
        if (data.senderList !== undefined) {          
          senderList = data.senderList;
        }

        // update pendingTotal
        pendingRef.child('pendingTotal').transaction(function(current_value) {
          return (current_value || 0) - 1;
        }); 

        // remove sender from receiver's pending sender list
        delete senderList[senderID];

        // update Firebase endpoint      
        pendingRef.update({
          senderList: senderList
        });

      })
      .catch(function(error) {
        console.error("Error:", error);
      });

    // add sender to receiever's friends list and vice versa
    addToFriendList(receiverID, senderID);
    addToFriendList(senderID, receiverID);
  };
    
  var addToFriendList = function(receiverID, senderID) {
    var ref = new Firebase("https://shining-torch-23.firebaseio.com/friends/" + receiverID);
    var obj = $firebaseObject(ref);
    obj.$loaded()
      .then(function(data) {
        console.log(data === obj); //true 
        
        var friendList = {};
        if (data.friendList !== undefined) {          
          friendList = data.friendList;
        }

        // update pendingTotal
        if (friendList[senderID] == undefined) {
          ref.child('friendTotal').transaction(function(current_value) {
            return (current_value || 0) + 1;
          }); 
        }

        // add to friendList
        friendList[senderID] = 'User\'s full name';

        // update Firebase endpoint      
        ref.update({
          friendList: friendList
        });

      })
      .catch(function(error) {
        console.error("Error:", error);
      });
  };
  
  var getUserFullName = function(userid) {
    var ref = new Firebase("https://shining-torch-23.firebaseio.com/profileInfo/"+ userid);
    var profileData = $firebaseObject(ref);
    profileData.$loaded(
      function(data) {
        return data.firstName + " " + data.lastName;
      },
      function(error) {
        console.error("Error:", error);
      }
    );
  };

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
