const express = require('express');
const { addToCart, showCart, dltProduct } = require('../controllers/cart.controller');
const { isLoggedIn } = require('../middleware');
const { showWishList } = require('../controllers/wishlist.controller');
const router = express.Router();

router.post('/user/:productId/cart', isLoggedIn , addToCart);
router.get('/user/cart', isLoggedIn , showCart);
router.delete('/user/:productId/:userId/dlt',dltProduct)


// wishlist route for get post request is here as well

router.get('/user/wishlist', isLoggedIn , showWishList);

module.exports = router;