const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');

async function addToCart(req,res){
    try{
        const {productId} = req.params;
        let product = await Product.findById(productId);
        let user = await User.findById(req.user._id);
        user.cart.push(product);
        await user.save();
        req.flash('success','Product added to cart!')
        return res.redirect(`/user/cart`);
    }
    catch(error){
        return res.render('error',{error})
    }
}

async function showCart(req,res){
    try{
        const user = await User.findById(req.user._id).populate('cart');
        return res.render('cart/show',{user})
    }
    catch(error){
        return res.render('error',{error})
    }
}

async function dltProduct(req,res){
    try{
        const {productId , userId} = req.params;
        // delete runs inside deleteOne
        let user = await User.findById(userId)
        user.cart = user.cart.filter(item => item._id!=productId)
        user.save();
        return res.redirect(`/user/cart`);
    }
    catch(error){
        return res.render('error',{error})
    }
}


module.exports = {addToCart , showCart , dltProduct}