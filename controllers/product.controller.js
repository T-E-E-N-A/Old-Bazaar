// importing collection
const Product = require("../models/Product")

// ---------new product add-----------
async function addForm(req,res){
    try{
        res.render('Products/new');
    }
    catch(err){
        req.flash('error','Product not added! failed!!')
        res.send(404).json({message:err.message});
    }
}
async function actualAdd(req,res) {
    try{
        let {name , img , price , desc} = req.body;
        await Product.create({name , img , price , desc , author : req.user._id});
        req.flash('success','Product added successfully')
        res.redirect('/products')
    }
    catch(err){
        req.flash('error','Product not added! failed!!')
        res.send(404).json({message:err.message});
    }
}

// ---------one product display----------
async function showMore(req,res){
    try{
        const id = req.params.id;
        const foundProduct = await Product.findById(id).populate('reviews');
        return res.render('Products/showOne',{foundProduct})
    }
    catch(err){
        res.send(404).json({message:err.message});
    }
}

// ----------------updation-------------
async function showUpdateForm(req,res){
    const id = req.params.id;
    const foundProduct = await Product.findById(id);
    res.render('Products/edit',{foundProduct})
}
async function updateProduct(req, res){
    try{

        const id = req.params.id;
        await Product.findByIdAndUpdate(id,req.body);
        req.flash('success' , 'Product updated successfully');
        return res.redirect(`/products/${id}`)
    }
    catch(err){
        req.flash('error','Product not updated! failed!!')
        res.send(404).json({message:err.message});
    }
}

// --------------delete----------------
async function deleteEntry(req,res){

    // raddi method - not good for production
    // for(let id of product.reviews){
    //     await Review.findByIdAndDelete(id);
    // }
    try{
        // this will delete only product not its reviews so
        // in backend findByIdAndDelete calls findOneAndDelete so we will add some lines of code to findOneAndDelete in models where we created schema b'coz works for particular schema
        // const product = await Product.findById(req.params.id);
        await Product.findByIdAndDelete(req.params.id);

        // lets hit flash here for a message - which flash success flash
        req.flash('success' , 'Product deleted successfully');
        return res.redirect('/products');
    }
    catch(err){
        req.flash('error','Product not added! failed!!')
        res.send(404);
    }
}

module.exports = {addForm , actualAdd , showMore , updateProduct,showUpdateForm , deleteEntry};