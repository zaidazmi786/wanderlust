const Listing = require("./models/listing.js");

const Review = require("./models/reviews.js");

module.exports.alllogin=(req,res,next)=>{

if(!req.isAuthenticated()){
    req.session.redirecturl=req.originalUrl
    req.flash("error","firstly you will have to login");
  return res.redirect("/login");
  
  }
  next();
  }

module.exports.saveredirecturl=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl;
    }
    next();
}


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listingData = await Listing.findById(id);

    if (!listingData) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (!listingData.owner[0].equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};




module.exports.isReviewAuthor = async (req, res, next) => {
    let { reviewId } = req.params; // ya jo bhi param name hai tumhare route mein
    let reviewData = await Review.findById(reviewId);

    if (!reviewData) {
        req.flash("error", "Review not found");
        return res.redirect("back");
    }

    // author array hai (jaisa tumhare data mein dikha), isliye [0] use karo
    if (!reviewData.author[0].equals(req.user._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${req.params.id}`);
    }

    next();
};