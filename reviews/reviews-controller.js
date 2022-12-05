import {getBooks} from "../books/books-controller.js";
import users from "../users/users.js";
import * as reviewDao from './reviews-dao.js'
import {findReviewsByAuthor, findReviewsByBook} from "./reviews-dao.js";

const ReviewsController = (app) => {

    // const userReviewsBook = async (req, res) => {
    //     console.log("req in controller", req)
    //     const newReview = req.body
    //     console.log("newReview in controller", newReview)
    //     const actualReview = await reviewDao.createReview(newReview)
    //     res.send(actualReview)
    // }
    

    // const findAllReviews = async (req, res) => {
    //     const allReviews = await reviewDao.findAllReviews()
    //     res.send(allReviews)
    // }


    // const userdeleteReview = async (req, res) => {
    //     const rid = req.params._id
    //     const status = await reviewDao.deleteReview(rid)
    //     res.json(status)
    // }

    // app.post('/users/:uid/reviews/:bid', userReviewsBook)
    // app.delete('/users/:uid/reviews/:bid',userdeleteReview)
    // app.get('/reviews', findAllReviews)


    // Followed instructor's step
    const createReview = async (req, res) => {
        const review = req.body
        const currentUser = req.session['currentUser']

        // review.author = currentUser._id
        // TODO:Fix this hardcoded userid after (user) update session
        review.author = "638af6a446fed1e23fdf9aed"
        
        const actualReview = await reviewDao.createReview(review)
        res.json(actualReview)
    }
    const findReviewsByBook = async (req, res) => {
        const booksapiID = req.params.booksapiID

        const reviews = await reviewDao.findReviewsByBook(booksapiID)

        res.json(reviews)
    }
    const findReviewsByAuthor = async (req, res) => {
        const author = req.params.author
        const reviews = await reviewDao.findReviewsByAuthor(author)
        res.json(reviews)
    }
    app.post('/api/reviews', createReview)
    app.get('/api/books/:booksapiID/reviews', findReviewsByBook)
    app.get('/api/users/:author/reviews', findReviewsByAuthor)




}

export default ReviewsController;