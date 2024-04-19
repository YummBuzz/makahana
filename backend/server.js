const express = require('express');

const cors =require('cors')
const dotenv = require("dotenv");
dotenv.config();

var app=express()
app.use(express.json());
app.use(cors()) 
// database import 

const database =require('./config/database.js')
database()

// routes  import
const routes =require('./routes/dataroutes.js')
app.use('/',routes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})