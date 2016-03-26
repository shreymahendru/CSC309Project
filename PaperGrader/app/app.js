/**
 * Created by shreymahendru on 2016-03-26.
 */
(function(){

    //setting up the app  model(nameOfApp , Dependencies)
    angular.module('PaperGrader', ['ui.router'])
        .config(function($stateProvider){
            //making everything single page like
            $stateProvider
                .state('signUp', {
                    url: "/signup",
                    templateUrl: "app/signup/signup.html",
                    controller: "SignupController"
                })
        })
}());