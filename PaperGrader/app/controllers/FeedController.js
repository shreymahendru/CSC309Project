/**
 * Created by shreymahendru on 2016-03-26.
 */
(function(){

    angular.module("PaperGrader")
        .controller('FeedController', ['$rootScope','$scope', '$state','$http', function($rootScope, $scope, $state, $http){
            $rootScope.title = $state.current.title;
            $rootScope.user = $state.current.user;
        }]);
}());
