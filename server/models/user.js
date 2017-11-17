var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectID = require('mongodb').ObjectID;


var UserSchema = new mongoose.Schema({
  name: String,
  created_at: {type: Date, default: Date.now },
  polls: [{type: Schema.Types.ObjectId, ref: 'Poll'}]
});
mongoose.model('User', UserSchema);
