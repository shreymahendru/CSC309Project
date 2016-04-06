var mongoose = require('mongoose');

module.exports =  mongoose.model('Post', {
   body: String,
   subject: String,
   title: String,
   description: String,
   averageGrade: Number,
   price: {type: Number, default: 0},
   date: String,
   solved: Boolean,
   author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   upvotes: {type: Number, default: 0},
});
