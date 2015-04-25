angular.module('projectsApp')
 .controller('SearchCtrl', function ($scope, searchService) {
 	var test = searchService.getSearchQuery();
 	$scope.queryString = test;

  })