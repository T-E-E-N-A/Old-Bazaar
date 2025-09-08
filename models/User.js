const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    email : {
        type:String,
        trim:true,
        required:true
    },
    role : {
        type : String,
        trim:true,
        required:true
    },
    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],
    wishList : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

// Collection User is cerated in db
let User = mongoose.model('User',userSchema)

module.exports = User;