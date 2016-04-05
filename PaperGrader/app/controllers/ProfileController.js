/**
 * Created by tim-gg on 2016-04-04.
 */

(function(){

    angular.module("PaperGrader")
        .controller('ProfileController', ['$scope','$http','$stateParams','$state', function($scope,$http,$stateParams,$state){
          console.log($stateParams.id);

          var query = 'api/users/'.concat($stateParams.id);
          console.log(query);
          $http.get(query).success(function(response){
              console.log(response);
          }).error(function(error){
              console.log(error);
          })
          }])
}());
