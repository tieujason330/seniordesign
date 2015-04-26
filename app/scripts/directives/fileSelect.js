'use strict';

angular.module('projectsApp')
.directive("ngFileSelect",function(){

  console.log('directive called');
  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
      
        $scope.file = (e.srcElement || e.target).files[0];
        console.log($scope.file);
        $scope.getFile();
      })
      
    }
    
  }
});
