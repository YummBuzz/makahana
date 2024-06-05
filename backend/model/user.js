const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    name: String,
    resetToken: String,
  resetTokenExpiry: Date,
  isVerified: Boolean,
  createdAt: { type: Date, default: Date.now }

});
const stuser = mongoose.model("users", userschema);
stuser.createIndexes();

module.exports = stuser;