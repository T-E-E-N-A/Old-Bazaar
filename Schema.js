const joi = require('joi');

const productSchema = joi.object({
    name : joi.string()
              .required()
              .min(0),
    price : joi.number()
               .min(0)
               .required(),
    img : joi.string()
              .required()
              .min(5),
    desc : joi.string()
              .required()
              .min(2)
})

const reviewSchema = joi.object({
    rating : joi.string()
              .required(),
    comment : joi.string()
              .required()
})

module.exports = { productSchema , reviewSchema }