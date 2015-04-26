'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the projectsApp
 * */
 angular.module('projectsApp')
 .controller('SearchCtrl', function ($scope, firebaseService) {
    console.log('search control loaded.');
    var ref = new Firebase(firebaseService.getFirebBaseURL());

    ref.child('users').once('value', function (snapshot) {
      console.log('...fetch users...');
      snapshot.forEach(function(data) {
        console.log("The " + data.key() + " dinosaur's score is " + data.val());
      });
    });
  })
