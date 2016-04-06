/**
 * Created by shreymahendru on 2016-03-26.
 */
(function(){

    angular.module("PaperGrader")
        .controller('FeedController', ['$rootScope','$scope', '$state','$http', function($rootScope, $scope, $state, $http){
            $rootScope.title = $state.current.title;
            $rootScope.userIn = $state.current.userIn;

            $http.get('/api/posts').success(function (res) {
                console.log(res[13].author);
                $scope.posts = res;
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
