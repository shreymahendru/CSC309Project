/**
 * Created by tim-gg on 2016-04-04.
 */

(function(){

    angular.module("PaperGrader")
        .controller('PostController', ['$rootScope','$scope','$http','$stateParams','$state', function($rootScope, $scope,$http,$stateParams,$state){
          // console.log($stateParams.id);
          $rootScope.title = $state.current.title;
          $rootScope.user = $state.current.user;

          var query = 'api/posts/' + $stateParams.post_id;
          $http.get(query).success(function(response){
              console.log(response);
              $scope.post = response;

              var subject = $scope.post.subject;
              var query = 'api/posts/subject/' + subject;
              $http.get(query).success(function(response){
                  console.log(response);
                  $scope.recomendationPosts = response;
              }).error(function(error){
                  console.log(error);
              })


          }).error(function(error){
              console.log(error);
          })

          $scope.redirect = function(post_id) {
            window.location = "/#/post/" + post_id;
          }
          
          }])
}());
