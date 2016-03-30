/**
 * Created by shreymahendru on 2016-03-26.
 */
(function(){

    angular.module("PaperGrader")
        .controller('LoginController', ['$rootScope','$scope', '$state','$http', function($rootScope, $scope, $state, $http){
            $rootScope.LogUserIn = function(){
              console.log("WTF");
                $http.post('api/user/login', $scope.loginUser).success(function (res) {
                    localStorage.setItem('User-data', JSON.stringify(res));
                    $state.go('home');
                }).error(function(error){
                    console.log(error);
                })
            };

            $rootScope.title = $state.current.title;
            $rootScope.user = $state.current.user;
        }]);
}());
