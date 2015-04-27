'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp')
  .controller('SettingsCtrl', 
    function ($scope, $mdDialog, firebaseService, userService, $firebaseAuth) {
      var ref = new Firebase(firebaseService.getFirebBaseURL());
      var authObj = $firebaseAuth(ref);
      var authData = authObj.$getAuth();
      $scope.userCurrent;

      ref.child('profileInfo').child(authData.uid).once('value', function (snapshot) {
          var val = snapshot.val();
          console.log(val);
          val.uid = authData.uid;
          userService.setCurrentUser(val);
          $scope.userCurrent = userService.getCurrentUser();
          $scope.$apply(function() {
            $scope.userCurrent.firstName = val.firstName;
            $scope.userCurrent.lastName  = val.lastName;
            $scope.userCurrent.email  = val.email;
        });
      });

      $scope.user;
      $scope.alert = '';

      if (authData) {
        console.log('Logged in as:' + authData.uid);
      } else {
      console.log('Logged out');
      }


    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.enter = function(input) {
        $mdDialog.hide(input);
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }

    $scope.emailConfirm = function(userMail, oldMail) {
      // Appending dialog to document.body to cover sidenav in docs app
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '../views/dialog_passwd.tmp.html',
      })
        .then(function(input){
          //Confirmed, pass input
          $scope.emailChange(input, userMail, oldMail);
        }, function(){
          //Cancelled, do nothing
        });
    };

    $scope.saveSettings = function(user){
      if(user !== undefined ){
        console.log('Attempting to save settings...');
        //Email changes require authorization from old email
        if(user.firstName !== undefined){
          ref.child('profileInfo').child($scope.userCurrent.uid).update({
                firstName: user.firstName
          });
          $scope.userCurrent.firstName = user.firstName;
        }
        if(user.lastName !== undefined){
          ref.child('profileInfo').child($scope.userCurrent.uid).update({
                lastName: user.lastName
          });
          $scope.userCurrent.lastName = user.lastName;
        }
        if(user.email !== undefined){
          $scope.emailConfirm(user.email, $scope.userCurrent.email);
        }
      }
    };

    $scope.postSettings = function (selection) {
      console.log('Setting post privacy: ' + selection);
      ref.child('privacy').child($scope.userCurrent.uid).update({
        postPrivacy: selection
      });
      $scope.userCurrent.postPrivacy = selection;
    };

    $scope.messageSettings = function (selection) {
      console.log('Setting message privacy: ' + selection);
      ref.child('privacy').child($scope.userCurrent.uid).update({
        messagePrivacy: selection
      });
      $scope.userCurrent.messagePrivacy = selection;
    };

    $scope.emailChange = function(passwd, userMail, oldMail){
        ref.changeEmail({
            oldEmail: oldMail,
            newEmail: userMail,
            password: passwd,
          }, function(error){
            console.log(error ? 'Failed to change email. ' + error : 'Email changed!');
            if(error){
              $scope.alert = 'Failed to change email.';
            }
            else{
              $scope.alert = 'Email changed!';
              ref.child('profileInfo').child($scope.userCurrent.uid).update({
                email: userMail
              });
              $scope.userCurrent.email = userMail;
            }
        });
    };
});
