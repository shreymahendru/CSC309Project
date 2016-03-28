var mongoose = require('mongoose');

module.exports =  mongoose.model('Comment', {
   body: String,
   author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   upvotes: {type: Number, default: 0},
   post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});
