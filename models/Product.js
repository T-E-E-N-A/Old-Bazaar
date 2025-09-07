const mongoose = require("mongoose");
const Review = require('./Review')

let productSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    price : {
        type : Number,
        min : 0,
        required : true
    },
    img : {
        type : String,
        trim : true
    },
    desc : {
        type:String,
        trim : true
    },
    avgRating : {
        type:Number,
        default:0
    },
    reviews : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Review'
        }
    ],
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

// middleware jo BTS mongodb operations karwane par use hota hai and iske andar pre nd post middleware hote hai which are basically used over the schema and before the model is js class.

// here 2 req pre and post 
// pre means run before operation(delete of product)
// post means run later/after deletion of product 
// here doesn;t matter bcoz we have stored id or array of review so can use any of them
productSchema.post('findOneAndDelete' , async function(product){
    if(product.reviews.length > 0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

let Product = mongoose.model('Product',productSchema);

// exporting collection
module.exports = Product;