/**
 * Created by shreymahendru on 2016-03-26.
 */
(function(){

    angular.module("PaperGrader")
        .controller('SignupController', ['$rootScope','$scope', '$state', '$http', function($rootScope, $scope, $state, $http){
            $rootScope.title = $state.current.title;

            $rootScope.createUser = function(){
              console.log("signup");
                console.log($scope.newUser);
                $http.post('api/user/signup', $scope.newUser).success(function(response){
                }).error(function(error){
                    console.log(error);
                })

            };

        }])

}());
