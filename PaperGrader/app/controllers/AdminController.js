/**
 * Created by shreymahendru on 2016-04-05.
 */
(function(){

    angular.module("PaperGrader")
        .controller('AdminController', ['$rootScope', '$scope', '$state','$http', function($rootScope, $scope, $state, $http){
            $rootScope.title = $state.current.title;

            //console.log($state.current.user);

            $http.get('/api/users/current').success(function(res){
                if (res.local.admin === false){
                    $state.go('home');
                }
                else{
                    $http.get('/api/admin/users').success(function(res){
                        $scope.users = res;
                    }).error(function(error){
                        console.log(error);
                    });

                }
            }
            );

            $scope.edit_user = function(user_id){

                window.location = "/#/admin/edit/user/" + user_id;

            }


        }])

}());