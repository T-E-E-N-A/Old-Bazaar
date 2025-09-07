const express = require("express")
// importing collection
const products = require("../models/Product");
// controllers importing
const { addForm, actualAdd, showMore, updateProduct, showUpdateForm, deleteEntry } = require("../controllers/product.controller");
const { validateProduct, isLoggedIn, isSeller, myProduct } = require("../middleware");

const router = express.Router() //mini instance as real instance(app) can't be imported 

// without using controller folder
router.get('/products',async(req,res)=>{
    const productsObj = await products.find({});
    // console.log(currentUser);
    res.render('Products/index.ejs',{productsObj})
})

//----------------------------------------------------------------------------------------
//------------------------- others by using controller-------------------------------------
//----------------------------------------------------------------------------------------

router.get('/products/add', isLoggedIn , isSeller , addForm);
router.post('/product/new'  , validateProduct , isLoggedIn , isSeller ,actualAdd);
router.get('/products/:id',isLoggedIn,showMore);
router.get('/products/:id/edit', isLoggedIn , isSeller , myProduct, showUpdateForm)
router.patch('/products/:id',isLoggedIn, validateProduct ,isSeller, updateProduct)
router.delete('/products/:id/dlt', isLoggedIn , isSeller, myProduct, deleteEntry)


module.exports = router