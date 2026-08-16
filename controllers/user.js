const User = require("../models/user.js");

module.exports.signuppage=(req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.userSignup=async(req,res,next)=>{
try{
    let {username,email,password}=req.body;
   let newuser= new User({username,email})
let registered=await User.register(newuser,password);
// console.log(registered);

req.logIn(registered,(err)=>{
    if(err){
        return next(err)
    }
    req.flash("success","welcome to wanderlust.")
    res.redirect("/listings");
})

}catch(e){
    req.flash("error", e.message)
    res.redirect("/signup");
}
}

module.exports.loginpage=(req,res)=>{
    res.render("users/login.ejs")
}
module.exports.loginauthentication=(req, res)=> {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirecturl=res.locals.redirecturl||"/listings"
        res.redirect(redirecturl);
  }

 module.exports.userlogout=(req,res,next)=>{
  req.logOut((err)=>{
if(err){
    return next(err);
}
  })
  req.flash("success","you logged out.")
  res.redirect("/listings")
  }