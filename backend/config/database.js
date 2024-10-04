const mongoose = require( 'mongoose' );
async  function database(){
   
    // await mongoose.connect("mongodb://0.0.0.0:27017/makhana");
    await mongoose.connect("mongodb+srv://jitenderbachhraj5:oAuT02EGYWv6pDjn@poultry.uq1ykby.mongodb.net/makana?retryWrites=true&w=majority&appName=makana");
    console.log("Database Connected");

}
module.exports = database;