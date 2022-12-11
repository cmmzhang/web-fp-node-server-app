import reviewsModel from "./reviews-model.js";

export const createReview = async(review) =>{
    const actualReview = await reviewsModel.create(review)
    console.log("actual review in reviews-dao", actualReview)
    actualReview.author = review.author
    return actualReview

  }

  export const findAllReviews = async () =>
  await reviewsModel.find()

export const findReviewsByBook = async(booksapiID) =>{
    return await reviewsModel.find({booksapiID})
    .populate('author')
    .exec()
}


export const findReviewsByAuthor = (author) =>
    reviewsModel.find({author}) 

export const deleteReview = async(review_id, author)=>{
  return await reviewsModel.deleteOne({_id: review_id, author: author})
}
