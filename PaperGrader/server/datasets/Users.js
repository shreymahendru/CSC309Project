/**
 * Created by shreymahendru on 2016-03-26.
 */
var mongoose = require('mongoose');
model.export =  mongoose.model('User', {
    email: String,
    password: String
});
