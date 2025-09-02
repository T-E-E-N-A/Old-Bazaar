const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
    comment:{
        type:String,
        trim:true
    }
} , {timestamps:true})

// here Review is name of collection in database and Review is name used in vs code
const Review = new mongoose.model( 'Review',reviewSchema);

module.exports = Review;