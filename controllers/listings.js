const listing = require("../models/listing.js");
const review =require("../models/reviews.js");
const Listing = require("../models/listing.js");
// const User = require("../models/user.js");

// index — show all listings
module.exports.index = async (req, res) => {
    let alllisting = await Listing.find({});
    res.render("listings/index.ejs", { alllisting });
};

// render new listing form
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// show one listing in detail
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let datainfo = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!datainfo) {
        req.flash("error", "This listing is not present");
        return res.redirect("/listings");
    }
    res.render("listings/showdetail.ejs", { datainfo });
};

// create a new listing
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(req.body.listing.location)}&format=json`,
        { headers: { 'User-Agent': 'wanderlust-app' } }
    );
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
        req.flash("error", "Location nahi mili, sahi address daalein");
        return res.redirect("/listings/new");
    }

    const lon = parseFloat(geoData[0].lon);
    const lat = parseFloat(geoData[0].lat);

    // Extra safety check
    if (isNaN(lon) || isNaN(lat)) {
        req.flash("error", "Location ke coordinates nahi mile, dusra address try karein");
        return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = {
        type: "Point",
        coordinates: [lon, lat],
    };

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};
// render edit form
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listingData = await Listing.findById(id);


    if (!listingData) {
        req.flash("error", "This listing is not present");
        return res.redirect("/listings");

    }
    let originalimage=listingData.image.url;
    originalimage= originalimage.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs", { listing: listingData ,originalimage});
};

// update a listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    delete req.body.listing.image;

    let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
        runValidators: true,
        new: true,
    });

    // Location बदली हो तो coordinates भी update करें
    const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(req.body.listing.location)}&format=json`,
        { headers: { 'User-Agent': 'wanderlust-app' } }
    );
    const geoData = await geoRes.json();
    if (geoData && geoData.length > 0) {
        listing.geometry = {
            type: "Point",
            coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)],
        };
    }

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    await listing.save();
    req.flash("success", "Updated List");
    res.redirect(`/listings/${id}`);
};

// delete a listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Deleted list");
    res.redirect("/listings");
};


// search
module.exports.searchListings = async (req, res) => {
    // console.log("SEARCH ROUTE HIT");   
    let { country } = req.query;
    // console.log("Country query:", country); 

    if (!country || country.trim() === "") {
        req.flash("error", "Kripya search karne ke liye country daalein");
        return res.redirect("/listings");
    }

    let results = await Listing.find({
        contry: { $regex: country, $options: "i" }
    });
    console.log("Results found:", results.length);   

    res.render("listings/searchResults.ejs", { results, searchTerm: country });
};

//filter
module.exports.index = async (req, res) => {
    let { category } = req.query;
    let filter = {};
    if (category) {
        filter.category = category;
    }
    let alllisting = await Listing.find(filter);
    res.render("listings/index.ejs", { alllisting, activeCategory: category || null });
};