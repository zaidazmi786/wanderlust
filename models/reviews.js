const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },
    author:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ]
});

module.exports = mongoose.model("review", reviewSchema);