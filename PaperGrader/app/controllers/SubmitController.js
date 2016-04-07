/**
* Created by tim-gg on 2016-04-04.
*/

(function(){

  angular.module("PaperGrader")
  .controller('SubmitController', ['$rootScope','$scope','$http','$stateParams','$state', function($rootScope, $scope,$http,$stateParams,$state){
    // console.log($stateParams.id);
    $rootScope.title = $state.current.title;
    $rootScope.userIn = $state.current.userIn;
    var query = 'api/posts/' + $stateParams.post_id;

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

    $scope.submitPost = function(){
      console.log($scope.post.subject);

      var data = {
          body: $scope.post.body,
          subject: $scope.post.subject,
          title: $scope.post.title,
          description: $scope.post.description,
          date: today,
          solved: false,
        }

      console.log(data);

      $http.post('/api/posts', data).success(function(response){
        console.log(response);
        $scope.post = response;
        $state.go('home');
      }).error(function(error){
        console.log(error);
      })

      $http.post('/api/users/add_points/'+ $rootScope.user._id + '/-20', data).success(function(response){
        console.log(response);
      }).error(function(error){
        console.log(error);
      })

      window.location = "/#/home"

    }
  }])
}());
