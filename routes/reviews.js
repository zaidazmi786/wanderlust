const express = require("express");

const router=express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapasync=require("../utility/wrapasync.js");
const ExpressError=require("../utility/ExpressError.js");
const { listingSchema,reviewSchema } = require("../schema");
const review =require("../models/reviews.js");
// const Listing = require("../models/listing.js");
const listing = require("../models/listing.js");
const {alllogin,isReviewAuthor }=require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
//validate reviews

const validateReview = (req, res, next) => {
     console.log("BODY:", req.body); 
  const { error } =reviewSchema.validate(req.body);
if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
   throw new ExpressError(400, errMsg);
  }

  next();
};

//add a new review

router.post(
    "/",
    alllogin,
    
    validateReview,
    wrapasync(reviewController.postreview)
);

// delete review=========

router.delete("/:reviewId",
  alllogin,
  isReviewAuthor,
  wrapasync(reviewController.deleteReveiw)
);





module.exports=router;