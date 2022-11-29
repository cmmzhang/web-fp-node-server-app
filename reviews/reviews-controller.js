import {getBooks} from "../books/books-controller.js";
import users from "../users/users.js";
import * as reviewDao from './reviews-dao.js'

const ReviewsController = (app) => {

    const userReviewsBook = async (req, res) => {
        console.log("req in controller", req)
        const newReview = req.body
        console.log("newReview in controller", newReview)
        const actualReview = await reviewDao.createReview(newReview)
        res.send(actualReview)
    }
    //
    // const findAllReviews = (req, res) => {
    //     const populatedBooks = populate({
    //         rawResults: reviews,
    //         fieldToPopulate: 'book',
    //         sourceData: getBooks(),
    //         sourceField: '_id'
    //     })
    //     const populateUsers = populate({
    //         rawResults: populatedBooks,
    //         fieldToPopulate: 'user',
    //         sourceData: users,
    //         sourceField: '_id'
    //     })
    //     res.json(populateUsers)
    // }

    const findAllReviews = async (req, res) => {
        const allReviews = await reviewDao.findAllReviews()
        res.send(allReviews)
    }


    const userdeleteReview = async (req, res) => {
        const rid = req.params._id
        const status = await reviewDao.deleteReview(rid)
        res.json(status)
    }
    // const findBooksReviewedByUser = (req, res) => {
    //     const uid = req.params.uid
    //     const books = reviews.filter((review) => review.user === uid)
    //     const populatedBooks = populate({
    //         rawResults: books,
    //         fieldToPopulate: 'book',
    //         sourceData: getBooks(),
    //         sourceField: '_id'
    //     })
    //     res.json(populatedBooks)
    // }
    // const findUsersWhoReviewedBook = (req, res) => {
    //     const bid = req.params.bid
    //     const usersWhoLikeBook = reviews.filter((review) => review.book === bid)
    //     const populateUsers = populate({
    //         rawResults: userReviewsBook,
    //         fieldToPopulate: 'user',
    //         sourceData: users,
    //         sourceField: '_id'
    //     })
    //     res.json(populateUsers)
    // }

    app.post('/users/:uid/reviews/:bid', userReviewsBook)
    app.delete('/users/:uid/reviews/:bid',userdeleteReview)
    app.get('/reviews', findAllReviews)
    // app.get('/users/:uid/reviews', findBooksReviewedByUser)
    // app.get('/books/:bid/reviews', findUsersWhoReviewedBook)
}

export default ReviewsController;