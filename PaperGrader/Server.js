/**
* Created by shreymahendru on 2016-03-26.
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

require('./server/datasets/Posts');
require('./server/datasets/Comments');
require('./server/datasets/Users');


var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var AuthenticationController = require('./server/Controllers/AuthenticationController');

var app = express();


app.use('/app', express.static(__dirname + "/app"));

app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.use('/images', express.static(__dirname + "/images"));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'PaperGraderSecret',    // Creating sessions for each user
  saveUninitialized: true,
  resave: true}));

app.use(passport.initialize());  // start authentication

app.use(passport.session());   // connect passport for current session

require('./server/Controllers/AuthenticationController')(passport);  // importing passport Authentication






app.get('/', isLoggedIn, function(req, res){
  // res.sendFile(__dirname + '/firstPage.html');
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/firstPage.html');
});


// LOCAL LOGIN/SIGNUP
//=========================================================================
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/' // redirect back to the signup page if there is an error
  // failureFlash : true // allow flash messages
}));
        // THE SUCCESS REDIRECT WOULD B TO THE APP EVERY WHERE!!!!
        // REDIRECT TO PROFILE RIGHT NOW IS JUST TEMP!!!!!!

app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/' // redirect back to the signup page if there is an error
  //failureFlash : true // allow flash messages
}));


//FACEBOOK SIGNUP/LOGIN
//==========================================================================
// route for facebook authentication and login
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/'
    }));

//
// app.get('/home', isLoggedIn, function(req, res) {
//   console.log(req.user);
//  res.sendFile(__dirname + '/app/index.html');
// });


app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
}



 //DONT NEED THIS AS YOU CAN SEE IN THE ABOVE EXAMPLE EVERY REQ IS OF A SESSION AND EACH SESSION IS FOR A USER
// req.user has the user obj everytime which is autheticated



app.get('/api/users', function(req, res){
 User.find(function(err, users){
   if(err){ return err; }
     res.json(users);
 });
});

app.get('/api/posts', function(req, res, next){
  Post.find(function(err, posts){
    if(err){ return next(err); }
    res.json(posts);
  });
});

app.get('/api/comments', function(req, res, next){
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

//get user by name
app.get('/api/users/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err)
    res.send(err);
    res.json(user);
  });
});

//Get all comments for the post
app.get('/api/comments/posts/:post_id', function(req, res, next) {
  response = [];
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    comments.forEach (function (comment){
      if("post" in comment){
        if(comment.post == req.params.post_id){
          response.push(comment);
        }
      }
    });
    res.json(response);
  });
});

//Get all Feedback for the user
app.get('/api/comments/users/:user_id', function(req, res, next) {
  response = [];
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    comments.forEach (function (comment){
      if("user" in comment){
        if(comment.user == req.params.user_id){
          response.push(comment);
        }
      }
    });
    res.json(response);
  });
});

//Get all posts for the topic
app.get('/api/posts/topics/:topic', function(req, res, next) {
  response = [];
  Post.find(function(err, posts){
    if(err){ return next(err); }
    posts.forEach (function (post){
      if("topic" in post){
        if(post.topic == req.params.topic){
          response.push(post);
        }
      }
    });
    res.json(response);
  });
});

//Get all posts of the user
app.get('/api/posts/users/:user_id', function(req, res, next) {
  response = [];
  Post.find(function(err, posts){
    if(err){ return next(err); }
    posts.forEach (function (post){
      if("author" in post){
        if(post.user == req.params.user_id){
          response.push(post);
        }
      }
    });
    res.json(response);
  });
});




//Authentication
//app.post('/api/user/signup', AuthenticationController.signup);
//app.post('/api/user/login', AuthenticationController.login);

////Create user
//app.post('/api/users', function(req, res, next) {
//  var user = new User(req.body);
//  console.log(req.body);
//  user.save(function(err, user){
//    if(err){ return next(err); }
//    res.json(user);
//  });
//});

//Add a post
app.post('/api/posts', function(req, res, next) {
  var user = new Post(req.body);
  console.log(req.body);
  user.save(function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});

//Add a comment
app.post('/api/comments', function(req, res, next) {
  var user = new Comment(req.body);
  console.log(req.body);
  user.save(function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});

//connect to the mongodb
mongoose.connect('mongodb://localhost:27017/PaperGrader');


app.listen('3000', function(){
  console.log("Running");
});
