'use strict';

/**
 * @ngdoc overview
 * @name projectsApp
 * @description
 * # projectsApp
 *
 * Main module of the application.
 */



angular
  .module('projectsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'firebase'
  ])
  .run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        window.alert('You forgot to log in!');
        console.log("auth required");
        $location.path("/");
      }
    });
  }])
  .config(function ($routeProvider, $mdThemingProvider) {
    // themes colors:
    // Limit your selection of colors by choosing three color hues from the primary palette
    // and one accent color from the secondary palette.
    // The accent color may or may not need fallback options.
    // Rules :
    // 1. Only use the accent color for body text to accent a web link. Do not use the
    //    accent color for body text color.
    // 2. Don’t use the accent color for app bars or larger areas of color.
    //    Avoid using the same color for the floating action button and the background.
    $mdThemingProvider.theme('default');//.light();//.dark();

      // $mdIconProvider
      //   .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
      //   .defaultIconSet('img/icons/sets/core-icons.svg', 24);
      //.primaryPalette('indigo')
      //.accentPalette('pink');
      //.warnPalette ('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
        // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["$firebaseAuth", function ($firebaseAuth) {
                  var ref = new Firebase('https://shining-torch-23.firebaseio.com/');
                  var authObj = $firebaseAuth(ref);
                  return authObj.$requireAuth();
              }
          ]
        }
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
        // controller will not be loaded until $requireAuth resolves
          "currentAuth": ["$firebaseAuth", function ($firebaseAuth) {
                  var ref = new Firebase('https://shining-torch-23.firebaseio.com/');
                  var authObj = $firebaseAuth(ref);
                  return authObj.$requireAuth();
              }
          ]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });