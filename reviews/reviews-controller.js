import * as reviewDao from './reviews-dao.js'

const ReviewsController = (app) => {
    // Followed instructor's step
    const createReview = async (req, res) => {
        const review = req.body
        const currentUser = req.session['currentUser']

        review.author = currentUser._id
        // TODO:Fix this hardcoded userid after (user) update session
        // review.author = "638af6a446fed1e23fdf9aed"
        
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

    const findAllReviews = async (req, res) => {
        const reviews = await reviewDao.findAllReviews()
        res.json(reviews)}

    app.post('/reviews', createReview)
    app.get('/books/:booksapiID/reviews', findReviewsByBook)
    app.get('/users/:author/reviews', findReviewsByAuthor)
    app.get('/allreviews', findAllReviews)



}

export default ReviewsController;