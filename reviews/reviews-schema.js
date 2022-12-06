import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    review: String,
    booksapiID: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersModel'
    }
}, {collection: 'reviews'})

export default reviewsSchema