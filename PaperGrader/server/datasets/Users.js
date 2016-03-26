/**
 * Created by shreymahendru on 2016-03-26.
 */
var mongoose = require('mongoose');
module.exports =  mongoose.model('User', {
    name: String,
    email: String,
    password: String
});
