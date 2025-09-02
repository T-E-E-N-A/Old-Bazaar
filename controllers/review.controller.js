const Product = require('../models/Product');
const Review = require('../models/Review');

async function addReview(req,res){
    try{
        const {id} = req.params;
        let {rating,comment} = req.body;
        const product = await Product.findById(id);
        const review = await Review.create({rating,comment});
        
        product.reviews.push(review);
        await product.save();
        req.flash('success','Review added successfully')
        res.redirect(`/products/${id}`);
    }
    catch(err){
        req.flash('error','Product addition failed')
        res.send(404).json({message:err.message});
    }
}

async function deleteReview(req,res){
    try{
        const {id , idd} = req.params;
        // why comment this code functioning is this but product.reviews is array and find.. method doesn't work
        // const product = await Product.findById(id);
        // await product.reviews.findByIdAndDelete(idd);
        await Product.updateOne( { _id: id }, { $pull: { reviews: idd } });
        await Review.findByIdAndDelete(idd);
        req.flash('success','Review deleted successfully')
        res.redirect(`/products/${id}`);
    }
    catch(err){
        req.flash('error','Review not deleted')
        res.send(404).json({message:err.message});
    }
}

module.exports = {addReview , deleteReview};