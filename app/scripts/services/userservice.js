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
      },
      getUserProvisionSetting: function() {
        console.log(user);
        return user;
      },
      setUserProvisionSetting: function() {
        console.log(user);
        return user;
      }
    };
  })
  .factory('provisionSettings', function ($firebaseAuth, $mdDialog) {
  	var firebaseURL = 'https://shining-torch-23.firebaseio.com/';
    var ref = new Firebase(firebaseURL);
    var authObj = $firebaseAuth(ref);
    var authData = authObj.$getAuth();

    var saveMoreSettings = function(user) {
      console.log('saving more info...');
      if(user !== undefined ){
        console.log(user);  
        // update the user with additional info that was submitted  
        if(user.birthday !== undefined){
          ref.child('users').child(authData.uid).update({
            birthday: user.birthday
          });
        }

        if(user.school !== undefined){
          ref.child('users').child(authData.uid).update({
            school: user.school
          });
        }

        if(user.movies !== undefined){
          ref.child('users').child(authData.uid).update({
            movies: user.movies
          });
        }

        if(user.music !== undefined){
          ref.child('users').child(authData.uid).update({
            music: user.music
          });
        }

        if(user.picture !== undefined){
          ref.child('users').child(authData.uid).update({
            picture: user.picture
          });
        }
      }
    };

    var setUserProvision = function() {
      var provisionedData = ref.child('users').child(authData.uid);
      provisionedData.update({
        provisioned: 1
      });
    };

    function MoreInfoController($scope, $mdDialog) {
      $scope.save = function(user) {
        $mdDialog.hide();
        setUserProvision();
        saveMoreSettings(user);
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.uploadImage = function(image) {
        imageUpload = {
          data: image.data,
          thumbnail: image.thumbnail,
          name: image.filename
        };
        ref.child('users').child(authData.uid).update({
        });
        console.log('uploading image...');
      };
    }

    var showAboutForm = function() {
        $mdDialog.show({
          controller: MoreInfoController,
          templateUrl: 'views/about.tmpl.html'
        })
          .then(function(input){
            //Confirmed, pass input
            console.log('confirming...');
          }, function(){
            //Cancelled, do nothing
            console.log('canceling...');
          });
    };

    return {
      getMoreUserInfo: function(provision) {
        if (provision == '0') {
          showAboutForm();
        }
      },
      getUserProvision: function(callback) {
        var provisionedData = ref.child('users').child(authData.uid).child('provisioned').once('value', function (snapshot) {
          var val = snapshot.val();
          callback(val);
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
