/**
* Created by shreymahendru on 2016-03-26.
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');

require('./server/datasets/Posts');
require('./server/datasets/Comments');
require('./server/datasets/Users');


var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var AuthenticationController = require('./server/Controllers/AuthenticationController');

var app = express();

app.set('view engine', 'ejs'); // set up ejs for flash msgs

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

app.use(flash());




app.get('/', isLoggedIn, function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/login', function(req, res){
  res.render(__dirname + '/firstPage.ejs', { message: req.flash('loginMessage') });
});


// LOCAL LOGIN/SIGNUP
//=========================================================================
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));
// THE SUCCESS REDIRECT WOULD B TO THE APP EVERY WHERE!!!!
// REDIRECT TO PROFILE RIGHT NOW IS JUST TEMP!!!!!!

app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
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



app.get('/logout', function(req, res) {
  req.logout();
  console.log('loging out');
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
  // console.log(req.user._id);
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

app.get('/api/posts/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err)
    res.send(err);
    res.json(post);
  });
});


app.get('/api/comments', function(req, res, next){
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});


//get current session user
app.get('/api/users/current', function(req, res, next) {
  res.json(req.user);
});

app.get('');


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

          User.findById(comment.author, function(err, user){
            if(err){next(err)}
            comment.author = user;
          });

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
            User.findById(comment.author, function(err, user){
              if(err){next(err)}
              comment.author = user;
            });

              response.push(comment);
        }
      }
    });
    console.log('responding');
    res.json(response);
  });
});

//Get all posts for the topic
app.get('/api/posts/subject/:subject', function(req, res, next) {
  response = [];
  Post.find(function(err, posts){
    if(err){ return next(err); }
    posts.forEach (function (post){
      if("subject" in post){
        if(post.subject == req.params.subject){
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
        if(post.author == req.params.user_id){
          response.push(post);
        }
      }
    });
    res.json(response);
  });
});

//getting all users for Admin
app.get('/api/admin/users', function(req, res, next){
  User.find(function(err, users){
    if(err){next(err)}
    //console.log(users);
    res.json(users);
  });

});

// changing the profile of a user as said by admin
app.post('/api/admin/edit/user/:id', function(req, res, next){
  console.log(req.params.id);
  console.log(req.body);
  User.findById(req.params.id, function(err, user){
    if(err){next(err)}
    console.log(user);
    user.local.name = req.body.name;
    user.local.email = req.body.email;
    user.local.points = req.body.points;
    user.local.bio = req.body.bio;
      if(req.body.changePassword){
          console.log('password is changing');
          user.local.password =  user.generateHash(req.body.password);
      }

    user.save(function (err, user) {
      if (err) {
        return next(err);
      }
      res.end("Success");
    });
  });
});

//add points to user
app.post('/api/users/add_points/:id/:amount', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err){next(err)}
    user.local.points += parseInt(req.params.amount);

    user.save(function (err, user) {
      if (err) {
        return next(err);
      }
      res.end("Success");
    });
  });
});




//function isAdmin(req, res, next) {
//
//    // if user is authenticated in the session, carry on
//    if (req.user.local.admin)
//        return next();
//
//    // if they aren't redirect them to the home page
//    res.redirect('/');
//}





////Create user
app.post('/api/users', function (req, res, next) {
  var user = new User(req.body);
  console.log(req.body);
  user.save(function (err, user) {
    if (err) {
      return next(err);
    }
    console.log(user);
    res.json(user);
  });
});

//Add a post
app.post('/api/posts', function (req, res, next) {
  var post = new Post(req.body);
  post.author = req.user._id;
  post.save(function (err, post) {
    if (err) {
      return next(err);
    }
  });
});

//upvote a post
//action = "up" or "down"
app.post('/api/posts/:post_id/:action', function (req, res, next) {
  Post.findById(req.params.post_id, function(err, post){
    if(err){next(err)}
    console.log(post);

    if(req.params.action == 'up'){post.upvotes += 1;}
    else if(req.params.action == 'down'){post.upvotes -= 1;}
    else if(req.params.action == 'close'){
      post.solved = true;

    }


    post.save(function (err, post) {
      if (err) {
        return next(err);
      }
      res.json(post);
    });
  });
});




//upvote a review
//action = "up" or "down"
app.post('/api/comments/:comment_id/:action', function (req, res, next) {
  Comment.findById(req.params.comment_id, function(err, comment){
    if(err){next(err)}
    console.log(comment);

    if(req.params.action == 'up'){comment.upvotes += 1;}
    else if(req.params.action == 'down'){comment.upvotes -= 1;}

    comment.save(function (err, post) {
      if (err) {
        return next(err);
      }
      res.json(post);
    });
  });
});





//Add a comment
app.post('/api/comments', function (req, res, next) {
  var comment = new Comment(req.body);
  comment.author = req.user._id;


  console.log(req.body);
  comment.save(function (err, comment) {
    if (err) {
      return next(err);
    }
  });
});

//connect to the mongodb
mongoose.connect('mongodb://localhost:27017/PaperGrader');

app.listen('3000', function () {
  console.log("Running");
});
