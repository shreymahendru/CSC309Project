var mongoose = require('mongoose');

//Can relate to User or Post depending on the filled field
module.exports =  mongoose.model('Comment', {
   body: String,
   author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   grade: {type: Number, default: 0},
   upvotes: {type: Number, default: 0},
   date: String,
   post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});
