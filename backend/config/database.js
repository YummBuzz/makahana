const mongoose = require( 'mongoose' );
async  function database(){
   
    await mongoose.connect("mongodb://0.0.0.0:27017/makhana");
    console.log("Database Connected");

}
module.exports = database;