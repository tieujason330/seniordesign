angular.module('projectsApp')
  .controller('ProfileCtrl', 
    function ($scope, firebaseService, userService, $firebaseAuth) {
 
 		$scope.movie;
    	$scope.movies = [];
    	$scope.music;
    	$scope.musics = [];


    	$scope.addMovie = function(name) {
    		$scope.movies.push(name);
    		$scope.movie = null;
    	};

    	$scope.removeMovie = function(index) {
    		$scope.movies.splice(index,1);
    	}

    	$scope.addMusic = function(name) {
    		$scope.musics.push(name);
    		$scope.music = null;
    	};

    	$scope.removeMusic = function(index) {
    		$scope.musics.splice(index,1);
    	}


});
