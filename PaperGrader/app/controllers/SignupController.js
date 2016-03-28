/**
 * Created by shreymahendru on 2016-03-26.
 */
(function(){

    angular.module("PaperGrader")
        .controller('SignupController', ['$scope', '$state', '$http', function($scope, $state, $http){
            $scope.createUser = function(){
                console.log($scope.newUser);

                $http.post('api/user/signup', $scope.newUser).success(function(response){

                }).error(function(error){
                    console.log(error);
                })

            };

        }])

}());