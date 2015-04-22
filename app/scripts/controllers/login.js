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
  .controller('LoginCtrl', function ($scope, $location, $state, $firebaseAuth, firebaseService, $mdDialog, alertService) {
    var ref = new Firebase(firebaseService.getFirebBaseURL());
    var auth = $firebaseAuth(ref);
    //registers users on firebase
    $scope.createUser = function(user, form) {
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
          var msg = 'The new user account has been successfully created.';
          alertService.show(title,msg,'');
          ref.child('users').child(userData.uid).set({
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              provisioned: 0
          });
        }).catch(function (error) {

          if(error.code == 'EMAIL_TAKEN')
          {
              var title= 'Error Creating Account';
              var msg = 'The new user account cannot be created because the email is already in use.';
              alertService.show(title,msg,"");
          }

        });
      }
    }

    var changeLocation = function(url, forceReload) {
      $location.path(url);
      $scope = $scope || angular.element(document).scope();
      if(forceReload || !$scope.$$phase) {
        $scope.$apply();
      }
    };

    $scope.login = function(user, form, ev) {
        if(!form.$valid) {
            return;
        }
        auth.$authWithPassword({
            email: user.email,
            password: user.password
        }).then(function (authData) {
          console.log('Logged in as:' + authData.uid);
          $state.go('home');
          //changeLocation('/home', true);
        }).catch(function (error) {
          var msg = 'Invalid E-mail or password. Please try again';
          alertService.show(msg,ev);
        });
    };


 $scope.registerFB = function() {
      ref.authWithOAuthPopup('facebook', function(error, authData) {
        scope: 'email,user_likes' // permission requests
        if (error) {
          console.log('Login Failed!', error);
        } else {
          console.log("Authenticated successfully with payload:", authData);

          // creating firebase endpoint
          ref.child('users').child(authData.uid).set({
              email: authData.facebook.cachedUserProfile.email,
              firstName: authData.facebook.cachedUserProfile.first_name,
              lastName: authData.facebook.cachedUserProfile.last_name,
              picture: authData.facebook.cachedUserProfile.picture.data.url
          });


          changeLocation('/home', true);
        }
      }, {
          scope: "email,user_likes" // permission requests
        });
    };

    $scope.registerGoogle = function() {
      ref.authWithOAuthPopup('google', function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
          console.log(authData.uid);

          ref.child('users').child(authData.uid).set({
              email: authData.google.email,
              firstName: authData.google.cachedUserProfile.given_name,
              lastName: authData.google.cachedUserProfile.family_name,
              picture: authData.google.cachedUserProfile.picture
          });
          changeLocation('/home', true);
        }
      }, {
          scope: "email" // permission requests
      }
      )};

    $scope.registerTwitter = function() {
      ref.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {

          var name = authData.twitter.cachedUserProfile.name; name = name.split(" ");
          var firstName = name[0];
          var lastName = name[name.length-1];
          var aboutMe = authData.twitter.cachedUserProfile.description;
          var twitterEmail = authData.twitter.cachedUserProfile.screen_name + "@ucrpal.com";
          var profileImage = authData.twitter.cachedUserProfile.profile_image_url;

         
         ref.child('users').child(authData.uid).set({
              email:  twitterEmail,
              firstName: firstName,
              lastName: lastName,
              picture: profileImage
          });        

          changeLocation('/home', true);
        }
      });
    };
    /*
    function populateSettings(user) {
    }
    */
  });