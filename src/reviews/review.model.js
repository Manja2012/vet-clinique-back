const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    review: {
        type: String,
        required: true,
    }, 
    rating: {
        type: Number,
        required: true,  
    } ,
})

const Reviews = model('review', reviewSchema);

module.exports = Reviews;