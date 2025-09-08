const express = require('express');
const { addLike } = require('../../controllers/wishlist.controller');
const { isLoggedIn } = require('../../middleware');
const router = express.Router();

router.post('/product/:id/like', isLoggedIn , addLike)

module.exports = router;