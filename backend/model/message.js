const mongoose = require('mongoose')


const msgschema = new mongoose.Schema({
    name: String,
    email: String,
    contact:Number,
    message:String,
    createdAt: { type: Date, default: Date.now }
})

const stmsg= mongoose.model("messages", msgschema);
stmsg.createIndexes();

module.exports = stmsg;