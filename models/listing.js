const mongoose = require("mongoose");
const {Schema}=mongoose;

const review=require("./reviews.js")

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    
    url:String,
    filename:String,
  },

  price: {
    type: Number,
  },

  location: {
    type: String,
  },

  contry: {
    type: String,
  },
  reviews:[
    {
    type:Schema.Types.ObjectId,
    ref:"review"
  }
  ],
  owner:[
    {
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  ],
   geometry: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
        },
    },

    category: {
    type: String,
    enum: ["trending", "rooms", "iconic-cities", "mountains", "castles", "pools", "camping", "farms", "domes", "boats"],
}
});


// deleting listing related reviews
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
await review.deleteMany({_id:{$in: listing.reviews}})
}
});



const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;