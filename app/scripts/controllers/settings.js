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
    function ($scope, $mdDialog, firebaseService, userService) {
      //Current User Form Info
      $scope.userCurrent = userService.getCurrentUser();
      //Entered User Form Info
      $scope.user;
      //Confirmation Alert
      $scope.alert = '';

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.enter = function(input) {
        $mdDialog.hide(input);
      }
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    };

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

    //fb ref
    var ref = new Firebase(firebaseService.getFirebBaseURL());
    $scope.saveSettings = function(user){
      if(user !== undefined ){
        console.log('attempting to save settings...');
        console.log(user);  
        //Email changes require authorization from old email
        if(user.firstName != ''){
          ref.child('users').child($scope.userCurrent.uid).set({
                firstName: user.firstName
          });
        }
        if(user.lastName != ''){
          ref.child('users').child($scope.userCurrent.uid).set({
                lastName: user.lastName
          });
        }
        if(user.email != ''){
          $scope.emailConfirm(user.email, $scope.userCurrent.email);
        }
      }
    };

    $scope.emailChange = function(passwd, userMail, oldMail){
      console.log('passwd: ' + passwd + 'userMail: ' + userMail + 'oldMail: ' + oldMail);
        var ref = new Firebase(firebaseService.getFirebBaseURL());
        ref.changeEmail({
            oldEmail: oldMail,
            newEmail: userMail,
            password: passwd,
          }, function(error){
            console.log(error ? "Failed to change email: " + error : "Email changed!");
            if(error){
              $scope.alert = 'Failed to change email.';
            }
            else{
              $scope.alert = 'Email changed!';
              ref.child('users').child($scope.userCurrent.uid).set({
                email: userMail
              });
            }
        });
    };
});
