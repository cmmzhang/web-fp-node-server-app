import reviewsModel from "./reviews-model.js";

export const createReview = (review) =>
    reviewsModel.create(review)


export const findAllReviews = () =>
    reviewsModel.find()

export const findReviewById = (uid) =>
    reviewsModel.findById(uid)

export const findByUsername = (username) =>
    reviewsModel.findOne({username})


export const deleteReview = (uid) =>
    reviewsModel.deleteOne({_id: uid})

export const updateReview = (rid, reviewUpdates) =>
    reviewsModel.updateOne({_id: rid},
        {$set: reviewUpdates})