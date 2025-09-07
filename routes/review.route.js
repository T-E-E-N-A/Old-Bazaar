const express = require("express");
const router = express.Router();

const { addReview, deleteReview } = require('../controllers/review.controller');
const { validateReview } = require("../middleware");

// validateReview is middleware here 
//  route is called then validate then added the review 
// #Server Side validation
router.post('/products/:id/review', validateReview , addReview)
router.delete('/products/:id/:idd/dlt', deleteReview)

module.exports = router;