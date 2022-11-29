import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    reviewContent: String,
    book: String,
    email: String,
    time: Date,
    type: {type: String, enum: ['Art', 'Buisness', 'Biography', 'classic']},
}, {collection: 'reviews'})

export default reviewsSchema