const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    name: String,
    resetToken: String,
  resetTokenExpiry: Date
   
    
});
const stuser = mongoose.model("users", userschema);
stuser.createIndexes();

module.exports = stuser;