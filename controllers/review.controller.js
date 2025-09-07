const Product = require('../models/Product');
const Review = require('../models/Review');

async function addReview(req,res){
    try{
        const {id} = req.params;
        let {rating,comment} = req.body;
        const product = await Product.findById(id);
        const newRating = Math.round(((product.avgRating * product.reviews.length) + parseInt(rating))/(product.reviews.length+1));
        product.avgRating = newRating;
        const review = await Review.create({rating,comment});
        
        product.reviews.push(review);
        await product.save();
        req.flash('success','Review added successfully')
        res.redirect(`/products/${id}`);
    }
    catch(error){
        req.flash('error','Product addition failed')
        res.render('error',{error});
    }
}

async function deleteReview(req,res){
    try{
        const {id , idd} = req.params;
        // why comment this code functioning is this but product.reviews is array and find.. method doesn't work
        // await product.reviews.findByIdAndDelete(idd);

        const product = await Product.findById(id);
        const review = await Review.findById(idd);

        let newRating = 0;
        if (product.reviews.length > 1) {
            newRating = Math.round((product.avgRating * product.reviews.length - review.rating) / (product.reviews.length - 1));
        }
        product.avgRating = newRating;
        await product.save();

        await Product.updateOne( { _id: id }, { $pull: { reviews: idd } });
        await Review.findByIdAndDelete(idd);
        req.flash('success','Review deleted successfully')
        res.redirect(`/products/${id}`);
    }
    catch(error){
        req.flash('error','Review not deleted')
        res.render('error',{error});
    }
}

module.exports = {addReview , deleteReview};