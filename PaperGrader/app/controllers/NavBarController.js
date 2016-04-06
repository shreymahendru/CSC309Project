/**
 * Created by tim-gg on 2016-03-26.
 */
(function(){

    angular.module("PaperGrader")
        .controller('NavBarController', ['$scope', '$state', '$http', function($scope, $state, $http){

         var query = 'api/users/current';
         $http.get(query).success(function(response){
             console.log(response);
             $scope.user = response.local;
            //  console.log($scope.user.admin);
            //  if($scope.user.admin) {
            //    $rootScope.admin = true;
            //  }
         }).error(function(error){
             console.log(error);
         })
        }]);
}());
