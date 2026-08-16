const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
// const Listing = require("../models/listing.js");

const wrapasync = require("../utility/wrapasync.js");
const ExpressError = require("../utility/ExpressError.js");
const { listingSchema } = require("../schema");
const { alllogin, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')//for uploading image
const {storage}=require("../cloudConfig.js");


const upload = multer({storage})
// const User = require("../models/user.js");
// listing validation middleware
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};

// index + create
router
    .route("/")
    .get(wrapasync(listingController.index))
     .post(alllogin, 
        upload.single("listing[image]"),
        validateListing,
         wrapasync(listingController.createListing));

// new form
router.get("/new", alllogin, listingController.renderNewForm);


router.get("/search", wrapasync(listingController.searchListings));

// show, update, delete
router
    .route("/:id")
    .get(wrapasync(listingController.showListing))
    .put(alllogin, isOwner,upload.single("listing[image]"), validateListing, wrapasync(listingController.updateListing))
    .delete(alllogin, isOwner, wrapasync(listingController.destroyListing));

// edit form
router.get("/:id/edit", alllogin, isOwner, wrapasync(listingController.renderEditForm));

module.exports = router;