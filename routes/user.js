const express = require('express');
const { registerForm, actualRegister, actualLogin, loginForm , logOut } = require('../controllers/user.controller');
// const { logOut } = require('.../controllers/user.controller')
const passport = require('passport');
const router = express.Router();

router.get('/register',registerForm);
router.post('/register',actualRegister)


router.route('/login')
    .get(loginForm)
    .post(passport.authenticate('local', { 
            failureRedirect: '/login',
            failureFlash: true
    }), actualLogin);

router.get('/logout',logOut)

module.exports = router