/**
 * Created by shreymahendru on 2016-03-26.
 */
var Users  = require('../datasets/Users');

module.exports.signup = function(req, res){
    console.log(req.body);
    var user = new Users(req.body);
    user.save();
    res.json(req.body);
};

module.exports.login = function(req, res){
  Users.find(req.body, function(err, results){
      if (err) {
          console.log("Error User not Found");
      }
      if (results && results.length == 1)
      {
          console.log(results[0]);
          var  name = String(results[0].name);
          console.log(name);
          res.json(req.body.email);

      }
  });
};