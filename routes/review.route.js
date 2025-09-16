const express = require("express");
const router = express.Router();

const { addReview, deleteReview } = require('../controllers/review.controller');
const { validateReview, isSeller, isLoggedIn } = require("../middleware");

// validateReview is middleware here 
//  route is called then validate then added the review 
// #Server Side validation
router.post('/products/:id/review', validateReview , isLoggedIn , addReview)
// only seller of that product can delete the review
router.delete('/products/:id/:idd/dlt', isSeller, deleteReview)

module.exports = router;