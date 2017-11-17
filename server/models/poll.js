var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectID = require('mongodb').ObjectID;

var UserSchema = new mongoose.Schema({
  question: String,

  option1: String,
  option1_votes: {type: Number, default: 0},

  option2: String,
  option2_votes: {type: Number, default: 0},

  option3: String,
  option3_votes: {type: Number, default: 0},

  option4: String,
  option4_votes: {type: Number, default: 0},

  _created_by: {type: Schema.ObjectId, ref: 'User'},
  _created_by_name: String,
  
  created_at: {type: Date, default: Date.now }
});

mongoose.model('Poll', UserSchema);
