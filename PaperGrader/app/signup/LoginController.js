/**
 * Created by shreymahendru on 2016-03-26.
 */
(function(){

    angular.module("PaperGrader")
        .controller('LoginController', ['$scope', '$state','$http', function($scope, $state, $http){
            $scope.LogUserIn = function(){
                $http.post('api/user/login', $scope.loginUser).success(function (res) {
                    console.log("WTF?");
                    localStorage.setItem('User-data', JSON.stringify(res));
                }).error(function(error){
                    console.log(error);
                })

            };

        }]);

}());