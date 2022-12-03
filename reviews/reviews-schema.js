import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    // user: {type: String, unique: true},
    // book: String,
    // review: String,
    // email: String,
    // time: Date,
    // type: {type: String, enum: ['Art', 'Buisness', 'Biography', 'classic']},

    // Followed instructor
    review: String,
    booksapiID: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersModel'
    }
}, {collection: 'reviews'})

export default reviewsSchema