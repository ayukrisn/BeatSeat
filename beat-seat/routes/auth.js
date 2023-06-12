const router = require("express").Router();
const passport = require('passport');
const authController = require("../controllers/authController");
const {roleAuthentication} = require("../config/auth.js")

// Login route
router.get("/login", authController.getLoginPage);

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/auth/role',
        failureRedirect: '/auth/login',
        failureFlash : true
    })(req,res,next)
});

router.get('/role', roleAuthentication);

// Signup route
router.get("/signup", authController.getSignupPage);
router.post("/signup", authController.signup);

// Logout route
router.get("/logout", authController.logout);

module.exports = router;
