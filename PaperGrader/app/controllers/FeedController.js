/**
* Created by shreymahendru on 2016-03-26.
*/
(function(){

  angular.module("PaperGrader")
  .controller('FeedController', ['$rootScope','$scope', '$state','$http', function($rootScope, $scope, $state, $http){
    $rootScope.title = $state.current.title;
    $rootScope.userIn = $state.current.userIn;

    $http.get('/api/posts').success(function (res) {
      $scope.posts = res.reverse();
      // var i = 0;
      // for (i = 0; i < $scope.posts.length; i++) {
      //   if($scope.posts[i].author){
      //
      //   if($scope.posts[i].author == $rootScope.user._id){
      //      $scope.posts[i].author = $rootScope.user;
      //   }else{
      //     var authorQuery = 'api/users/'+$scope.posts[i].author;
      //
      //     if($scope.posts[i].author){
      //       console.log($scope.posts[i]);
      //
      //     $http.get(authorQuery).success(function(response){
      //       console.log(response);
      //       console.log($scope.posts[i].author);
      //
      //
      //       $scope.posts[i].author = response;
      //
      //     }).error(function(error){
      //       console.log(error);
      //     })
      //   }
      //   }
      // }
      // }



    }).error(function(error){
      console.log(error);
    });


    $scope.redirect = function(post_id) {
      window.location = "/#/post/" + post_id;
    };

    $scope.getAuthor = function(author_id){
      console.log(author_id);
      var author = {};
      $http.get('/api/users/'+author_id).success(function (res) {
        console.log(res);
        author = res;
        // $scope.posts = res;
      })
      return author;
    };

  }]);
}());
