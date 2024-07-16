const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/nayaappforgolus");


const userSchema = new mongoose.Schema({
  username: {
    username: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  posts:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
  }
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);