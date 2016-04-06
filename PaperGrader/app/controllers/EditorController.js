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

            }).error(function(error){
                console.log(error);
                });

            $scope.submitChanges = function(old_user){
                console.log("Hello");
                var temp_user = old_user;
                console.log(temp_user);
                if(angular.isDefined($scope.new)) // check if any change
                {
                    if(angular.isDefined($scope.new.name) && !(temp_user.name === $scope.new.name) ){
                        temp_user.name = $scope.new.name;
                    }
                    if(angular.isDefined($scope.new.email) && !(temp_user.email === $scope.new.email) ){
                        temp_user.email = $scope.new.email;
                    }
                    if(angular.isDefined($scope.new.bio) && !(temp_user.bio === $scope.new.bio) ){
                        temp_user.bio = $scope.new.bio;
                    }
                    if(angular.isDefined($scope.new.password)){
                        temp_user.password = $scope.new.password;
                    }

                }
                console.log(temp_user);
            }

        }]




        )
}());