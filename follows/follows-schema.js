import mongoose from "mongoose";

const followsSchema = mongoose.Schema({
  followed: {type: mongoose.Schema.Types.ObjectId, ref: 'usersModel'},
  follower: {type: mongoose.Schema.Types.ObjectId, ref: 'usersModel'},
}, {collection: 'follows'})

export default followsSchema