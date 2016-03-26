/**
 * Created by shreymahendru on 2016-03-26.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var AuthenticationController = require('./server/Controllers/AuthenticationController');

var app = express();

app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.use('/app', express.static(__dirname + "/app"));

app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.use('/images', express.static(__dirname + "/images"));

app.use(bodyParser.json());

//Aithentication
app.post('/api/user/signup', AuthenticationController.signup);

app.post('/api/user/login', AuthenticationController.login);

//connect to the mongodb
mongoose.connect('mongodb://localhost:27017/PaperGrader');


app.listen('3000', function(){
    console.log("Running");
});

