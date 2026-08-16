const listing = require("../models/listing.js");
const review =require("../models/reviews.js");
const Listing = require("../models/listing.js");


// add post reveiws
module.exports.postreview=async (req, res) => {

        let listing = await Listing.findById(req.params.id);
      
         

        let newreview = new review(req.body.review);
        newreview.author=req.user._id;
        console.log(newreview)


        await newreview.save();

        listing.reviews.push(newreview._id);

        await listing.save();
          req.flash("success","added new review.");

        res.redirect(`/listings/${listing._id}`);
    };


    //delete reveiws

    module.exports.deleteReveiw=async(req,res)=>{
    let {id,reviewId}=req.params;

    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
      req.flash("success","Deleted review");

    res.redirect(`/listings/${id}`)
};