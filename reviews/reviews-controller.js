import * as reviewDao from './reviews-dao.js'

const ReviewsController = (app) => {
    // Followed instructor's step
    const createReview = async (req, res) => {
        const review = req.body
        const currentUser = req.session['currentUser']

        // review.author = currentUser._id
        review.author = currentUser
        console.log("review-controller currentUser",currentUser)
        // console.log("review-controller booksapiID",booksapiID)
        // TODO:Fix this hardcoded userid after (user) update session
        // review.author = "638af6a446fed1e23fdf9aed"

    
        const actualReview = await reviewDao.createReview(review)
        console.log("actualReview controller", actualReview)
        actualReview.author = currentUser
        res.json(actualReview)
    }
    const findReviewsByBook = async (req, res) => {
        const booksapiID = req.params.booksapiID
        console.log("review-controller booksapiID",booksapiID)
        const reviews = await reviewDao.findReviewsByBook(booksapiID)
        console.log("review-controller reviews",reviews)
        res.json(reviews)
    }
    const findReviewsByAuthor = async (req, res) => {
        const author = req.params.author
        const reviews = await reviewDao.findReviewsByAuthor(author)
        res.json(reviews)
    }

    const findAllReviews = async (req, res) => {
        const reviews = await reviewDao.findAllReviews()
        res.json(reviews)}
        
    const deleteReview = async(req, res) =>{
        const review_id = req.params._id
        const author = req.params.author
        const status = await reviewDao.deleteReview(review_id, author)
        res.send(status)
    }
    
    app.post('/reviews', createReview)
    app.get('/books/:booksapiID/reviews', findReviewsByBook)
    app.get('/users/:author/reviews', findReviewsByAuthor)
    app.get('/allreviews', findAllReviews)
    app.delete('/review/:_id/author/:author', deleteReview)


}

export default ReviewsController;