let Product = require('./models/Product')

async function add(){
        await Product.insertMany([
        {
            name : "Mac Book1",
            price : 250000,
            img : "https://plus.unsplash.com/premium_photo-1751891806770-db33e1124093?w=600",
            desc : "Khareed lo bhai mere leekr"
        },
        {
            name : "Mac Book2",
            price : 255000,
            img : "https://images.unsplash.com/photo-1509395176047-4a66953fd231?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            desc : "Khareed lo bhai mere leekr"
        },
        {
            name : "Mac Book3",
            price : 255500,
            img : "https://plus.unsplash.com/premium_photo-1751891806770-db33e1124093?w=600",
            desc : "Khareed lo"
        },
        {
            name : "Mac Book4",
            price : 2555500,
            img : "https://plus.unsplash.com/premium_photo-1751891806770-db33e1124093?w=600"
        }
    ])
}

module.exports = add;