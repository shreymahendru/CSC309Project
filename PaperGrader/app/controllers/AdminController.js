/**
 * Created by shreymahendru on 2016-04-05.
 */
(function(){

    angular.module("PaperGrader")
        .controller('AdminController', ['$rootScope', '$scope', '$state','$http', function($rootScope, $scope, $state, $http){
            $rootScope.title = $state.current.title;

            $http.get('/api/admin/users').success(function(res){
               $scope.users = res;
            }).error(function(error){
                console.log(error);
            });

        }])

}());