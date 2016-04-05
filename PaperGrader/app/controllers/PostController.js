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
          }).error(function(error){
              console.log(error);
          })
          }])
}());
