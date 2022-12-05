import reviewsModel from "./reviews-model.js";

// export const createReview = async(review) =>{
//     console.log("review in reviews-dao",review)
//     const actualReview = await reviewsModel.create(review)
//     return actualReview

//   }

    


// export const findAllReviews = async() =>{
//     const allReview = await reviewsModel.find()
//     return allReview
// }

// export const findReviewById = (uid) =>
//     reviewsModel.findById(uid)

// export const findByUsername = (username) =>
//     reviewsModel.findOne({username})


// export const deleteReview = async (uid) =>{
//     const status = await reviewsModel.deleteOne({_id: uid})
// }


// export const updateReview = (rid, reviewUpdates) =>{
//     const status = reviewsModel.updateOne({_id: rid},
//         {$set: reviewUpdates})
//     return status
// }


export const createReview = async(review) =>{
    console.log("review in reviews-dao",review)
    const actualReview = await reviewsModel.create(review)
    return actualReview

  }



export const findReviewsByBook = async(booksapiID) =>{    
    await reviewsModel
    .find({booksapiID})
    .populate('author')
    .exec()
}


export const findReviewsByAuthor = (author) =>
    reviewsModel.find({author})