/**
 * Created by shreymahendru on 2016-03-26.
 */
(function(){

    angular.module("PaperGrader")
        .controller('HomeController', ['$scope', '$state', function($scope, $state){
         $state.go('home');
        }]);
}());
