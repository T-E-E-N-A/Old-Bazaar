const express = require('express');
const { addToCart, showCart, dltProduct } = require('../controllers/cart.controller');
const { isLoggedIn } = require('../middleware');
const router = express.Router();

router.post('/user/:productId/cart', isLoggedIn , addToCart);
router.get('/user/cart', isLoggedIn , showCart);
router.delete('/user/:productId/:userId/dlt',dltProduct)

module.exports = router;