const express = require('express');
const Razorpay = require("razorpay")


const cors =require('cors')
const dotenv = require("dotenv");
dotenv.config();

var app=express()
app.use(express.json());
app.use(cors(
    {
        origin: [`${process.env.URL}`],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
)) 
// database import 

const database =require('./config/database.js')
database()
app.get('',(req,res)=>{
    res.json(`Server is running ${process.env.URL}`);
})

// routes  import
const routes =require('./routes/dataroutes.js')
app.use('/',routes)

// razorpay instance
// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
//   });

//   module.exports = instance 


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})