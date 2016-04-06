/**
 * Created by shreymahendru on 2016-04-06.
 */
(function(){
    angular.module("PaperGrader")
        .controller('EditorController', ['$rootScope','$scope','$http','$stateParams','$state', function($rootScope, $scope,$http,$stateParams,$state){
                console.log($stateParams.user_id);
            var query  = '/api/users/' + $stateParams.user_id;

            $http.get(query).success(function(response){
                console.log(response);

                $scope.user = response.local;
                $scope.user_id = $stateParams.user_id;

            }).error(function(error){
                console.log(error);
                });

            $scope.submitChanges = function(old_user, user_id){
                console.log("Hello");
                var temp_user = old_user;
                console.log(user_id);
                if(angular.isDefined($scope.new)) // check if any change
                {
                    if(angular.isDefined($scope.new.name) && ((temp_user.name === $scope.new.name) ===false) ){
                        temp_user.name = $scope.new.name;
                    }
                    if(angular.isDefined($scope.new.email) && ((temp_user.email === $scope.new.email) === false) ){
                        temp_user.email = $scope.new.email;
                    }
                    if(angular.isDefined($scope.new.bio) && ((temp_user.bio === $scope.new.bio) === false)){
                        temp_user.bio = $scope.new.bio;
                    }
                    temp_user.changePassword = false;
                    if(angular.isDefined($scope.new.password)){
                        temp_user.password = $scope.new.password;
                        temp_user.changePassword = true;
                    }
                    console.log(typeof ($scope.new.points));
                    if(angular.isDefined($scope.new.points) && ((temp_user.points === $scope.new.points) === false) ){
                        temp_user.points = $scope.new.points;
                    }

                }

                var query= '/api/admin/edit/user/' + user_id;
                console.log(query);
                $http.post(query, temp_user).success(function(response){
                    alert("Change successful");
                    window.location = '/#/admin';
                }).error(function(error){
                    console.log(error);
                });

                console.log(temp_user);
            }

        }]




        )
}());
