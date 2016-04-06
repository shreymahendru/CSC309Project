/**
 * Created by tim-gg on 2016-04-04.
 */

(function(){

    angular.module("PaperGrader")
        .controller('ProfileController', ['$rootScope','$scope','$http','$stateParams','$state','$q', function($rootScope, $scope,$http,$stateParams,$state,$q){
          // console.log($stateParams.id);
          $rootScope.title = $state.current.title;
          $rootScope.user = $state.current.user;
          var currentUser;
          $http.get('api/users/current').success(function(response){
              console.log(response);
              $scope.user = response;
              currentUser = response;
              // $scope.getFeedback();
              // $scope.getPostedTasks();

              var query1 = '/api/comments/users/' + $scope.user._id;
              var query2 = '/api/posts/users/' + $scope.user._id;
              $scope.getFeedback = $http.get(query1);
              $scope.getPostedTasks = $http.get(query2);

              $q.all([$scope.getFeedback, $scope.getPostedTasks]).then(function(values) {
                console.log(values);
                $scope.feedback = values[0].data;
                $scope.posts = values[1].data;
              });

          }).error(function(error){
              console.log(error);
          })


        //   $scope.getFeedback = function(){
        //     var query = '/api/comments/users/' + $scope.user._id;
        //     $http.get(query).success(function(resp){
        //         console.log(resp);
        //         $scope.feedback = resp;
        //     }).error(function(error){
        //         console.log(error);
        //     })
        //   }
        //
        //   $scope.getPostedTasks = function(){
        //   var query = '/api/posts/users/' + $scope.user._id;
        //   console.log(query);
        //   $http.get(query).success(function (res) {
        //       console.log(res);
        //       $scope.posts = res;
        //   }).error(function(error){
        //       console.log(error);
        //   })
        // }

        $scope.getReviewedTasks = function(){
        $http.get('/api/posts').success(function (res) {
            console.log(res);
            $scope.posts = res;
        }).error(function(error){
            console.log(error);
        })
      }


          }])
}());
