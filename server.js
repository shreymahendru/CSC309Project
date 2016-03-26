/**
 * Created by shreymahendru on 2016-03-24.
 */
var express = require('express');
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');
//create Application
var app  = express();

//Add MiddleWare required for rest api
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/paperApp');
mongoose.connection.once('open', function(){
    console.log('Listining to port');
    app.listen(3000);
});


