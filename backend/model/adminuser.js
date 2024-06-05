const mongoose = require('mongoose')


const adminschema = new mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    accesslevel:String,
    loginTime: {
        type: Date,
        required: true,
        default: Date.now
      },
      createdAt: { type: Date, default: Date.now }
})

const adminuser = mongoose.model("adminusers", adminschema);
adminuser.createIndexes();

module.exports = adminuser;