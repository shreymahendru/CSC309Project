/**
 * Created by tim-gg on 2016-04-04.
 */

(function(){

    angular.module("PaperGrader")
        .controller('ProfileController', ['$rootScope','$scope','$http','$stateParams','$state','$q','$filter', function($rootScope, $scope,$http,$stateParams,$state,$q,$filter){
          // console.log($stateParams.id);
          $rootScope.title = $state.current.title;
          $rootScope.userIn = $state.current.userIn;
          $http.get('api/users/current').success(function(response){

              if(response._id == $stateParams._id){
                $scope.myProfile = true;
                $scope.user = response;
                $scope.update()
              }
              else{
                $scope.myProfile = false;
                var query = '/api/users/' + $stateParams._id;
                $http.get(query).success(function(resp){
                        $scope.user = resp;
                        console.log(resp);
                        $scope.update()
                    }).error(function(error){
                        console.log(error);
                    })
              }
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


        $scope.update = function(){
          console.log($scope.user);


          $http.get('/api/posts/users/' + $scope.user._id).success(function(response) {
            console.log(response);
            $scope.posts = response;

            $http.get('/api/comments/users/' + $scope.user._id).success(function(response) {
              console.log(response);
              $scope.feedback = response;
            });
          }).error(function(error){
              console.log(error);
          });

        }





        $scope.reviewVote = function(action, id) {
          var value = 0;
          if(action == 'up'){value = 1}
          else if(action == 'down'){value = -1}
          var review = $filter('filter')($scope.feedback, {_id: id})[0];
          review.upvotes += value;
          var voteQuery = '/api/comments/' + id + '/' + action;
          $http.post(voteQuery, '').success(function(response){
            console.log(response);
          }).error(function(error){
            console.log(error);
          })
        }

        $scope.getReviewedTasks = function(){
        $http.get('/api/posts').success(function (res) {
            console.log(res);
            $scope.posts = res;
        }).error(function(error){
            console.log(error);
        })
      }

      $scope.submitReview = function() {
        console.log($scope.review);

        var grade = 0;
        if($scope.review.grade == 'A'){grade=100}
        else if($scope.review.grade == 'B'){grade=80}
        else if($scope.review.grade == 'C'){grade=70}
        else if($scope.review.grade == 'D'){grade=60}
        else if($scope.review.grade == 'E'){grade=50}
        else if($scope.review.grade == 'F'){grade=40}

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth(); //January is 0!
        var yy = today.getFullYear();
        if(dd<10) {
          dd='0'+dd
        }
        if(mm<10) {
          mm='0'+mm
        }
        today = mm+'.'+dd+'.'+yy;

        var data = {
            body: $scope.review.body,
            grade: grade,
            date: today,
            user: $scope.user._id,
            date: today,
          }

        console.log(data);

        $http.post('/api/comments', data).success(function(response){
          console.log(response);
          // $scope.review = response;
          $state.reload();
        }).error(function(error){
          console.log(error);
        })
      }


          }])
}());
