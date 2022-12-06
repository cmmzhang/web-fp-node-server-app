import reviewsModel from "./reviews-model.js";

export const createReview = async(review) =>{
    console.log("review in reviews-dao",review)
    const actualReview = await reviewsModel.create(review)
    return actualReview

  }



export const findReviewsByBook = async(book) =>{    
    await reviewsModel
    .find({book})
    .populate('author')
    .exec()
}


export const findReviewsByAuthor = (author) =>
    reviewsModel.find({author})