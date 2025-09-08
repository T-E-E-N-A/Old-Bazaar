const User = require('../models/User')

function registerForm(req,res){
    res.render('Users/register')
}

async function actualRegister(req,res) {
    try{
        const {username , email , password ,role} = req.body;
        const user = new User({username,email , role});
        const newUser = await User.register(user,password);
        // req.flash('success' , 'Registered Succesfully!')
        // res.send(newUser);
        req.login( newUser , function(err){
            if(err) return next(err)
                req.flash('success' , 'welcome,you are registered & logged-in succesfully');
            return res.redirect('/products');
        })
    }
    catch(err){
        req.flash('error','failed to register!!')
        res.send(404).json({message:err.message});
    }
}

function loginForm(req,res){
    res.render('Users/login', { message: req.flash('error') });
}

// it took 2 arguments in one function authenticate and normal function 
function actualLogin(req,res){
    req.flash('success' , `welcome back ${req.user.username}!`)
    res.redirect('/products');

}

let logOut = (req, res) => {
    try{
        ()=>{ req.logout();}
        req.flash('success' , 'goodbye friends, see you again')
        res.redirect('/login');
    }
    catch(error){
        req.flash('error','failed to logOut!!')
        res.render('error',{error});
    }
}
module.exports = {registerForm,actualRegister , loginForm , actualLogin , logOut}