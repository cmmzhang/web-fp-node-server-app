import mongoose from "mongoose";

const followsSchema = mongoose.Schema({
    followed: {type: mongoose.Schema.Type.ObjectId, ref: 'UserModel'},
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: 'follows'})

export default followsSchema