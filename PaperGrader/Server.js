/**
* Created by shreymahendru on 2016-03-26.
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('./server/datasets/Posts');
require('./server/datasets/Comments');
require('./server/datasets/Users');


var User = mongoose.model('User');
var Post = mongoose.model('Post');
var AuthenticationController = require('./server/Controllers/AuthenticationController');

var app = express();

app.get('/', function(req, res){
  res.sendfile('index.html');
});

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
  Post.find(function(err, comments){
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

app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/images', express.static(__dirname + "/images"));
app.use(bodyParser.json());

//Aithentication
app.post('/api/user/signup', AuthenticationController.signup);
app.post('/api/user/login', AuthenticationController.login);

//Create user
app.post('/api/users', function(req, res, next) {
  var user = new User(req.body);
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
