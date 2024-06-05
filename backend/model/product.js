const mongoose = require('mongoose')


const productschema = new mongoose.Schema({
    title:String,
    prices: [{
        size: {
            type: String,
            
        },
        price: {
            type: Number,
            
        }
    }],
    description:String,
    type:String,
    brand:String,
    tag:String,
    imgFront:String,
    imgBack:String
   
})

const stproduct = mongoose.model("products", productschema);
stproduct.createIndexes();

module.exports = stproduct;