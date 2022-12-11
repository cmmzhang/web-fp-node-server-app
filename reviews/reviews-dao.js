import reviewsModel from "./reviews-model.js";

export const createReview = async(review) =>{
    const actualReview = await reviewsModel.create(review)
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