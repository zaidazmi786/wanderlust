if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
const express = require("express");
const mongoose = require("mongoose");
let path = require("path");
const methodoverride = require("method-override");
const listing = require("./models/listing.js");
const ejsmate = require("ejs-mate");
const wrapasync = require("./utility/wrapasync.js");
const ExpressError = require("./utility/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema");
const Listing = require("./models/listing.js");
const review = require("./models/reviews.js");
const listings = require("./routes/listings.js");
const reviewlist = require("./routes/reviews.js");
const userrouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
//require flash
const flash = require("connect-flash");
//require authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsmate);
const dburl = process.env.MONGO_URL;

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, //for lazy update
})

store.on("error", (err) => {
    console.log("error in mongo session store", err)
});

//for session

const sessiondata = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessiondata));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// currentUser + flash middleware (MUST come before routes)
app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    next();
});
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
// root route — direct listings pe redirect
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// routes
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviewlist);
app.use("/", userrouter);

//mongoosh connection
main().then((res) => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dburl);
}

//user authentication
app.get("/user", async (req, res) => {
    let register = new User({
        email: "zaid@gmail.com",
        username: "zaid123"
    })
    let registerdata = await User.register(register, "zaid@1234");
    // console.log(ragisterdata);
    res.send(registerdata);
});


app.all("/*splat", (req, res, next) => {
    // ExpressError(statusCode,message);
    next(new ExpressError(404, "page not found"));


});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error", { errorMessage: message });
});

app.listen(port, () => {
    console.log(`listening with port:${port}`);
});