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
    'ngMaterial'
  ])
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
      //.primaryPalette('indigo')
      //.accentPalette('pink');
      //.warnPalette (''); 
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/myroute', {
        templateUrl: 'views/myroute.html',
        controller: 'MyrouteCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/testbox.html',
        controller: 'ToolboxCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });