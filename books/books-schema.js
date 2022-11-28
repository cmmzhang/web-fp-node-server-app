import mongoose from "mongoose";

const booksSchema = mongoose.Schema({
    title: String,
    liked: {type: Boolean, default: false},
    likes: {type: Number, default: 0}
    }, {collection: "books"})

export default booksSchema