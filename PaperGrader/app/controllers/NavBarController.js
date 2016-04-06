/**
 * Created by tim-gg on 2016-03-26.
 */
(function(){

    angular.module("PaperGrader")
        .controller('NavBarController', ['$rootScope','$scope', '$state', '$http', function($rootScope,$scope, $state, $http) {

            var query = 'api/users/current';
            $http.get(query).success(function (response) {
                console.log(response);
                $scope.user = response;
                $rootScope.user = response;
                console.log($scope.user.admin);
                if ($scope.user.admin) {
                    $scope.admin = true;
                }
            }).error(function (error) {
                console.log(error);
            });

            $scope.logout = function () {
                $http.get("/logout").success(function (res) {
                    console.log("logged out");
                    window.location = '/';
                }).error(function (error) {
                    console.log(error);
                });
            }
        }
        ]);
}());
