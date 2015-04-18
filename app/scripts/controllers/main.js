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
  .controller('MainCtrl', function ($scope, $location, $firebaseAuth, firebaseService, $mdDialog, alertService) {
	 $scope.data = {
	      selectedIndex : 0,
	      secondLocked : true,
	      secondLabel : 'Item Two'
	};


    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };

    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

      //fb ref
    var ref = new Firebase(firebaseService.getFirebBaseURL());
    var auth = $firebaseAuth(ref);
    //registers users on firebase
    $scope.createUser = function(user, form, ev) {

      //Valid form fields
      if(form.$valid)
      {
        console.log('register user on firebase');

        auth.$createUser({
          email: user.email,
          password: user.password
        }).then(function (userData) {
          //stores other registration information at user endpoint
          var title= 'Welcome';
          var msg = 'The new user account has been successfully created.'
          alertService.show(title,msg,ev);

          ref.child('users').child(userData.uid).set({
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName
          });
        }).catch(function (error) {
          if(error.code == "EMAIL_TAKEN")
          {
              var title= 'Error Creating Account';
              var msg = 'The new user account cannot be created because the email is already in use.'
              alertService.show(title,msg,ev);
          }
        });
      }

    };

    var changeLocation = function(url, forceReload) {
      $location.path(url);
      $scope = $scope || angular.element(document).scope();
      if(forceReload || !$scope.$$phase) {
        $scope.$apply();
      }
    };


    $scope.login = function(user, form, ev) {
        if(!form.$valid)
        {
            return;
        }

          auth.$authWithPassword({
            email: user.email,
            password: user.password

          }).then(function (authData) {
            console.log('Logged in as:' + authData.uid);
            ref.child('users').child(authData.uid).once('value', function (snapshot) {
              var val = snapshot.val();
              console.log(val);

              changeLocation('/home', true);
            // To Update AngularJS $scope either use $apply or $timeout
           //   $scope.$apply(function () {
            //    $rootScope.displayName = val;
             // });
            });

            //should go to this state
            //$state.go('tab.chats');

          ////once signed in, store user name and unique id through some user profile service
            // var uniqueID = authData.uid.split(':');
            // $scope.uid = uniqueID[1];
            // sharedProperties is a profile service
            // sharedProperties.setUID(uniqueID[1]);
            // var reff = new Firebase('https://lahax.firebaseio.com/users/' + authData.uid);
            // reff.once('value', function(data) {
            // sharedProperties.setDisplayName(data.val().displayName);
          // });

          }).catch(function (error) {
            var title= 'Authentication Error';
            var msg = 'Invalid E-mail or password. Please try again';
            alertService.show(title,msg,ev);
          });


    };

    /*
    function populateSettings(user) {

    }

    $scope.registerFB = function() {



    };

    $scope.registerGoogle = function() {



    };

    $scope.registerTwitter = function() {



    };
    */
  });