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
                    templateUrl: "app/views/signup.html",
                    controller: "controllers/SignupController"
                })
                .state('login', {
                    url: "/login",
                    templateUrl : "app/views/login.html",
                    controller: "LoginController"
                })
                .state('home', {
                    url: "/home",
                    templateUrl : "app/views/feed.html",
                    controller: "FeedController"
                })
        })
}());
