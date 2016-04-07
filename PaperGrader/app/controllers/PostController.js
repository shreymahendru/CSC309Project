/**
 * Created by tim-gg on 2016-04-04.
 */

(function(){

    angular.module("PaperGrader")
        .controller('PostController', ['$rootScope','$scope','$http','$stateParams','$state','$filter', function($rootScope, $scope,$http,$stateParams,$state,$filter){
          // console.log($stateParams.id);
          $rootScope.title = $state.current.title;
          $rootScope.userIn = $state.current.userIn;
          $scope.toggleVal = false;

          var query = 'api/posts/' + $stateParams.post_id;
          $http.get(query).success(function(response){
              console.log(response);
              $scope.post = response;


              if(response.author == $rootScope.user._id){
                          $scope.myPost = true;
                          $scope.post.author = $rootScope.user;

                        }else{
                          $scope.myPost = false;

                          var authorQuery = 'api/users/'+response.author;
                          $http.get(authorQuery).success(function(response){
                              $scope.post.author = response;
                          }).error(function(error){
                              console.log(error);
                          })
                        }


              var query1 = 'api/posts/subject/' + $scope.post.subject;
              $http.get(query1).success(function(response){
                  $scope.recomendationPosts = response;
              }).error(function(error){
                  console.log(error);
              })

          }).error(function(error){
              console.log(error);
          })

          var query2 = 'api/comments/posts/' + $stateParams.post_id;

          $http.get(query2).success(function(res){
              $scope.reviews = res;
          }).error(function(error){
              console.log(error);
          })

          $scope.redirect = function(post_id) {
            window.location = "/#/post/" + post_id;
          }

          $scope.toggle = function(){
            if($scope.toggleVal==true){$scope.toggleVal=false}
            else{$scope.toggleVal=true}
            console.log($scope.toggleVal);
          }

          $scope.postVote = function(action) {
            var value = 0;
            if(action == 'up'){value = 1}
            else if(action == 'down'){value = -1}

            var voteQuery = '/api/posts/' + $stateParams.post_id + '/' + action;
            $http.post(voteQuery,'').success(function(){
              $scope.post.upvotes += value;
            }).error(function(error){
              console.log(error);
            })
          }

          $scope.reviewVote = function(action, id) {
            var value = 0;
            if(action == 'up'){value = 1}
            else if(action == 'down'){value = -1}
            var review = $filter('filter')($scope.reviews, {_id: id})[0];
            review.upvotes += value;
            var voteQuery = '/api/comments/' + id + '/' + action;
            $http.post(voteQuery, '').success(function(response){
              console.log(response);
            }).error(function(error){
              console.log(error);
            })
          }

          $scope.closeTask = function(){
            $http.post('/api/posts/' +$stateParams.post_id+'/close', '').success(function(response){
              console.log(response);
            }).error(function(error){
              console.log(error);
            })
            console.log("success");

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
                solved: false,
                post: $stateParams.post_id,
                date: today,
              }

            console.log(data);

            $http.post('/api/comments', data).success(function(response){
              console.log(response);
              // $scope.review = response;


            }).error(function(error){
              console.log(error);
            })

            $http.post('/api/users/add_points/'+ $rootScope.user._id + '/5', data).success(function(response){
              console.log(response);
              $state.go('home');

            }).error(function(error){
              console.log(error);
            })

            $state.reload();

          }



          }])
}());
