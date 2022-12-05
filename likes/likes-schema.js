import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'usersModel'},
  book: {type: mongoose.Schema.Types.String, ref: 'BookModel'},
}, {collection: 'likes'})
export default likesSchema