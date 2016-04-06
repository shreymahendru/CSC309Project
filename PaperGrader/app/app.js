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
                    userIn: false,
                    controller: "SignupController"
                })
                .state('login', {
                    url: "/login",
                    templateUrl : "app/views/login.html",
                    title: "Log In",
                    userIn: false,
                    controller: "LoginController"

                })
                .state('home', {
                    url: "/home",
                    templateUrl : "app/views/feed.html",
                    title: "Feed",
                    userIn: true,
                    controller: "FeedController"
                })
                .state('profile', {
                    url: "/profile/:_id",
                    templateUrl : "app/views/profile.html",
                    title: "My Profile",
                    userIn: true,
                    controller: "ProfileController"
                })
                .state('post', {
                    url: "/post/:post_id",
                    templateUrl : "app/views/task.html",
                    title: "Post",
                    userIn: true,
                    controller: "PostController"
                })
                .state('submit', {
                    url: "/submit",
                    templateUrl : "app/views/submission.html",
                    title: "Submit a Post",
                    userIn: true,
                    controller: "SubmitController"
                })
                .state('admin', {
                    url: "/admin",
                    templateUrl : "app/views/admin.html",
                    title: "Admin",
                    userIn: true,
                    controller: 'AdminController'
                })
                .state('AdminEditor', {
                    url: "/admin/edit/user/:user_id",
                    templateUrl : "app/views/editProfile.html",
                    title: "Edit User",
                    userIn: true,
                    controller: "EditorController"
                })
        })
          .run(function ($rootScope, $state, $stateParams) {
               $rootScope.title = "Online Grader";
               $rootScope.user = $state.current.user;
          });
}());
