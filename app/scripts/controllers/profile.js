angular.module('projectsApp')
  .controller('ProfileCtrl', 
    function ($scope, firebaseService, userService, $firebaseAuth) {
    var ref = new Firebase(firebaseService.getFirebBaseURL());


    $scope.userCurrent = userService.getCurrentUser();

    $scope.posts = [];

    $scope.loadPosts = function(){
      ref.child('posts').once('value', function (snapshot) {
        console.log('...fetching posts...');
        /*snapshot.forEach(function(child) {
          var key = child.key();
          var val = child.val();
          var profile = {};
          profile.key = key;
          profile.val = val;
          $scope.profiles.push(profile);
        })*/
        //console.log("CURRENT: " + $scope.userCurrent.uid);
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
                  //console.log("\t\tComment Sender: " + commentFire.val().senderName + "Comment Text: " + commentFire.val().text);
                  var comment = {sender: commentFire.val().senderName, text: commentFire.val().text};
                  post.comments.push(comment);
                }
              })
              $scope.posts.push(post);
            })
          }
          else{
            console.log("Non-current user");
            console.log("childKey: " + child.key());
          }
      	})
      	/*var post = {};
      	post.senderName = "John Smith";
      	post.text = "Post of John";

      	$scope.posts.push(post);
      	var message = snapshot.child('facebook:1583361245263366');
      	console.log(message.val());*/
      });
    };


});
