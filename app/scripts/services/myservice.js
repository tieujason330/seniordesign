'use strict';

/**
 * @ngdoc service
 * @name projectsApp.myService
 * @description
 * # myService
 * Service in the projectsApp.
 */
// AngularJS will instantiate a singleton by calling "new" on this function
angular.module('projectsApp')
  .service('firebaseService', function () {
  	var firebaseURL = 'https://shining-torch-23.firebaseio.com/';
  	return {
			getFirebBaseURL: function(){
				return firebaseURL;
			}
  	};
 });