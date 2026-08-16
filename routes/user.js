 const express = require("express");

 const router =express.Router();

 const User=require("../models/user.js");
const wrapasync = require("../utility/wrapasync.js");
const passport = require("passport");
const {saveredirecturl} =require("../middleware.js");
const userController=require("../controllers/user.js");
const user = require("../models/user.js");

// const wrapasync=require("./utility/wrapasync.js");
// const ExpressError=require("./utility/ExpressError.js");



router.get("/signup",(userController.signuppage) )

// store in data base

router.post("/signup",wrapasync(userController.userSignup)
);

//login page

router.get("/login",(userController.loginpage));

//login authentication

router.post('/login', 
    saveredirecturl,
  passport.authenticate('local', { failureRedirect: '/login',failureFlash: true, }),
  (userController.loginauthentication)
  );

  //add logout 

  router.get("/logout",(userController.userlogout));
module.exports=router;