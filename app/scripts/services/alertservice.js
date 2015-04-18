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
  .service('alertService', function ($mdDialog) {
  		return {
  			loginAuthentication: function(msg,event) {
				$mdDialog.show(
					$mdDialog.alert()
				                .title('Authentication Error')
				                .content(msg)
				                .ariaLabel('Alert Dialog Demo')
				                .ok('Retry')
				                .targetEvent(event)
				);
  			}
  		}
  });