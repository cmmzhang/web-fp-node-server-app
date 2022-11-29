import {getBooks} from "../books/books-controller.js";
import users from "../users/users.js";
import * as dao from './reviews-dao.js'
let reviews = [
    {_id: '123', user: '111', book:'321',book_title: 'Becoming'},
    {_id: '345', user: '111', book:'432',book_title: 'THE LOST METAL'},
    {_id: '456', user: '222', book:'543',book_title: 'FAIRY TALE'},
]

const ReviewsController = (app) => {
    // const populate = (
    //     {
    //         rawResults, fieldToPopulate,
    //         sourceData, sourceField
    //     }) => {
    //     const populatedResults = rawResults.map((raw) => {
    //         const source = sourceData.find(source => source[sourceField] === raw[fieldToPopulate])
    //         return ({
    //             ...raw,
    //             [fieldToPopulate]: source
    //         })
    //     })
    //     return populatedResults
    // }
    const userReviewsBook = async (req, res) => {
        const newReview = req.body
        const actualReview = await dao.createReview(newReview)
        res.json(actualReview)
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
        const reviews = await dao.findAllReviews()
        res.json(reviews)
    }


    const userdeleteReview = async (req, res) => {
        const rid = req.params._id
        const status = await dao.deleteReview(rid)
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