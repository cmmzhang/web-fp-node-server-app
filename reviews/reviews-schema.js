import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    user: {type: String, unique: true},
    book: String,
    review: String,
    // email: String,
    // time: Date,
    // type: {type: String, enum: ['Art', 'Buisness', 'Biography', 'classic']},
}, {collection: 'reviews'})

export default reviewsSchema