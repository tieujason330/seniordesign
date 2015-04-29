angular.module('projectsApp')
  .controller('ProfileCtrl', 
    function ($scope, firebaseService, userService, $firebaseAuth) {
    var ref = new Firebase(firebaseService.getFirebBaseURL());

    $scope.userCurrent = userService.getCurrentUser();
    $scope.posts = [];
    $scope.loadPosts = function(){
      ref.child('posts').once('value', function (snapshot) {
        console.log('...fetching posts...');
      	// profileID loop
      	snapshot.forEach(function(profileFire) {
      		if(profileFire.key() === "facebook:1583361245263366"){
            console.log("ProfileID: " + profileFire.key());
            // postID loop
            profileFire.forEach(function(postFire){              
              var post = {sender: postFire.val().senderName, text: postFire.val().text, comments: []};
              // commentID loop
              postFire.forEach(function(commentFire){
                if(commentFire.val().senderName !== undefined && commentFire.val().text !== undefined){
                  var comment = {sender: commentFire.val().senderName, text: commentFire.val().text};
                  post.comments.push(comment);
                }
              })
              $scope.posts.push(post);
            })
          }
          else{
            console.log("Posts belong to: " + child.key());
          }
      	})
      });
    };


});
