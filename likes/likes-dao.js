import likesModel from "./likes-model.js";

export const userLikesBook = async (uid, bid) => {
  return await likesModel.create({user: uid, book: bid})
}
export const userUnlikesBook = async(uid, bid) => {
  return await likesModel.deleteOne({user: uid, book: bid})
}
export const findBooksLikedByUser = async(uid) => {
  return await likesModel
  .find({user: uid}, {user: false})
}
export const findUsersThatLikeBook = async(bid) => {
  return await likesModel.find({book: bid}, {book: false})
  .populate('user', 'username') 
  .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()


// export const findBooksLikedByUser = async(uid) => {
//   return await likesModel.find({uid})
// }
// export const findUsersThatLikeBook = async(bid) => {
//   return await likesModel.find({bid}).populate('user', 'username').exec()
// }
// export const findAllLikes = async () =>{
//   return await likesModel.find().populate('user','username').exec()}