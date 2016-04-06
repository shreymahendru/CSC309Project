/**
 * Created by shreymahendru on 2016-03-26.
 */
//var mongoose = require('mongoose');
//module.exports =  mongoose.model('User', {
//    name: String,
//    email: String,
//    password: String
//});
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        name         : String,
        points       : {type: Number, default: 0},
        bio          : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
