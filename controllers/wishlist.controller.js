// importing collection
const Product = require("../models/Product")
const User = require("../models/User")

async function addLike(req,res){
    let user = req.user;
    const productId = req.params.id;
    // const product = await Product.findElementById(productId);
    let isLiked = user.wishList.includes(productId);
    
    // if(isLiked){
    //     User.findByIdAndUpdate(req.user._id , {$pull:{wishList:productId}})
    // }else{
    //     User.findByIdAndUpdate(req.user._id , {$addToSet:{wishList:productId}})
    // }

    //the below code can be done by else if as above
    const option = isLiked? '$pull' : '$addToSet';
    req.user = await User.findByIdAndUpdate(req.user._id , {[option]:{wishList:productId}} , {new:true} )

    res.send('like done api');
}

module.exports = {addLike};