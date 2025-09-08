const express = require('express');
const { productSchema, reviewSchema } = require('./Schema');
const Product = require('./models/Product');
const app = express();

const validateProduct = (req,res,next)=>{
    try{
        const {name,price,img,desc} = req.body;
        // validate return 2 arguments but we need not vaue
        // const {value,error} = productSchema.validate({name,price,img,desc});
        const {error} = productSchema.validate({name,price,img,desc});
    }
    catch(error){
        return res.render('error',{error})
    }
    next();
}

const validateReview = (req,res,next)=>{
    const {rating,comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});
    if(error){
        return res.render('error',{error})
    } else{
        next();
    }
}

const isLoggedIn = (req,res,next)=>{
    try{
         // console.log(req.xhr);
        //  xhr returns if request is ajax or not
        if(req.xhr && !req.isAuthenticated()){
            return res.status(401).json({msg:'you need to login first'});
        }
        if(!req.isAuthenticated()){
            req.flash('error',"Sorry You cannot Access this , Log-in First")
            return res.redirect('/login')
        }else{
            next();
        }
    }
    catch(error){
        req.flash('error',"Log-in First error")
        return res.render('error',{error});
    }
}


const isSeller = (req,res,next)=>{
    try{
        if(!req.user.role || req.user.role !== 'seller'){
            req.flash('error',"You do not have access!")
            return res.redirect('/products')
        }
        next();
    }
    catch(error){
        req.flash('error',"Log-in First error")
        return res.render('error',{error});
    }
}

const myProduct = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const product = await Product.findById(id);
        // console.log(`${req.user.id} and ${product.author}`);
        if(req.user.id != product.author){
            req.flash('error',"This product is from another buyer!")
            return res.redirect(`/products/${id}`);
        }
        next();
    }
    catch(error){
        req.flash('error',"This product is from another buyer!")
        return res.render('error',{error});
    }
}

module.exports = { validateReview , validateProduct , isLoggedIn , isSeller , myProduct}