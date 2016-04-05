/**
 * Created by shreymahendru on 2016-03-26.
 */
(function(){

    //setting up the app  model(nameOfApp , Dependencies)
    angular.module('PaperGrader', ['ui.router'])
        .config(function($stateProvider){
            //making everything single page like
            $stateProvider
            // .state('default', {
            //     url: "/",
            //     title: "Online Grader",
            //     user: true,
            //     templateUrl: "app/index.html"
            //     controller: "HomeController"
            //  })
                .state('signUp', {
                    url: "/signup",
                    templateUrl: "app/views/signup.html",
                    title: "Sign Up",
                    user: false,
                    controller: "SignupController"
                })
                .state('login', {
                    url: "/login",
                    templateUrl : "app/views/login.html",
                    title: "Log In",
                    user: false,
                    controller: "LoginController"

                })
                .state('home', {
                    url: "/home",
                    templateUrl : "app/views/feed.html",
                    title: "Feed",
                    user: true,
                    controller: "FeedController"
                })
                .state('profile', {
                    url: "/profile/:id",
                    templateUrl : "app/views/profile.html",
                    title: "My Profile",
                    user: true,
                    controller: "ProfileController"
                })
                .state('post', {
                    url: "/post/:permalink",
                    templateUrl : "app/views/task.html",
                    title: "Post",
                    user: true,
                    controller: "FeedController"
                })
                .state('submit', {
                    url: "/submit",
                    templateUrl : "app/views/submission.html",
                    title: "Submit a Post",
                    user: true,
                    controller: "FeedController"
                })
                .state('admin', {
                    url: "/admin",
                    templateUrl : "app/views/admin.html",
                    title: "Admin",
                    user: true,
                    controller: "FeedController"
                })
        })
          .run(function ($rootScope, $state, $stateParams) {
               $rootScope.title = "Online Grader";
               $rootScope.user = $state.current.user;
          });
}());
