if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const seed = require("./seed")                      //file hai dummy data
const engine = require('ejs-mate')                  //biolerplate code
const methodOverride = require('method-override')   //for patch delete
const session = require('express-session')          //stores session-data on server side
const flash = require('connect-flash')              //to show notifictions on success or failure
const passport = require('passport')                //authentication middleware for Node.js
const LocalStrategy = require('passport-local')     //strategy for authenticating

// importing collections.models as needed for serilaize , deserialize
const User = require('./models/User')


// all routes required
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review.route')
const userRoutes = require('./routes/user')
const cartRoutes = require('./routes/cart.route')
const wishlistRoutes = require('./routes/api/wishlist.route')
// const orderRoutes = require('./routes/order')


// added dummy data once then commented
// seed()


// database connection which return a promise
// mongoose.connect("mongodb://127.0.0.1:27017/shopApp")
// const dbUrl = process.env.dbUrl || 'mongodb://localhost:27017/shopping-app'
const dbUrl = process.env.dbUrl

mongoose.set('strictQuery', true);
mongoose.connect(dbUrl)
.then(()=>{
    console.log("Database Connected succesfully")
})
.catch(()=>{
    console.log("Fail to connect....")
})


let secret = process.env.SECRET || 'keyboard_cat';

// used in middleware of session
let configSession = {
    secret : secret,
    name:'old_bazaar',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

// --------------------------- middlewares ------------------------------

app.engine('ejs', engine);                                  //here engine is ejs_mate we are telling that ejs file read by ejs-mate
app.set('view engine','ejs');                               //view engine will see ejs file 
app.set('views',path.join(__dirname,'views'))               //views folder - stores templates files
app.use(express.static(path.join(__dirname,'public')))      //public folder - static files to serve
app.use(express.urlencoded({ extended: true }));            //Converts the form data into a JavaScript object
app.use(express.json())                                     // convert in json format
app.use(methodOverride('_method'))                          //alow method-override for patch delete

app.use(session(configSession))                             //session management
app.use(flash())                                            //for alerts or message for particular action

app.use(passport.initialize());
app.use(passport.session())

// passport should be before locals 
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// use static authenticate method of model in LocalStrategy
//Telling the passport to check for username and password using authenticate method provided by the passport-local-mongoose package
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// work on every incoming request as routes need to check
app.use(productRoutes)
app.use(reviewRoutes)
app.use(userRoutes)
app.use(cartRoutes)
app.use(wishlistRoutes)
// app.use(orderRoutes);


// home page
app.get('/', (req, res) => {
    res.render('home');
});



// app.all('*', (req, res) => {
//     res.render('error', { error: 'You are requesting a wrong url!!!' })
// });

const port = 8080;

// server connection with particular port id
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})
