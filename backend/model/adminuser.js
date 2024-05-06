const mongoose = require('mongoose')


const adminschema = new mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    accesslevel:String
})

const adminuser = mongoose.model("adminusers", adminschema);
adminuser.createIndexes();

module.exports = adminuser;