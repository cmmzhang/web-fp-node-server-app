import * as booksDao from "./books-dao.js";

export let books = [
    {
        _id: '123',
        title: 'b1'
    },
    {
        _id: '234',
        title: 'b2'
    },
]

export const getBooks = () => books;

const BooksController = (app) => {
    const createBook = async (req, res) => {
        const book = req.body
        // book["_id"] = (new Date()).getTime() + ''
        // book["likeCount"] = 0
        // book["liked"] = false
        // books.push(book)
        const actualBook = await booksDao.createBook(book)
        res.send(actualBook)
    }

    const findAllBooks = async (req, res) => {
        const allBooks = await booksDao.findAllBooks()
        res.send(allBooks)
    }

    const updateBook = async (req, res) => {
        const bid = req.params['bid']
        const bookUpdates = req.body
        const status = await booksDao.updateBook(bid, bookUpdates)
        // const bookIndex = books.findIndex((b) => b._id === bid)
        // books[bookIndex] = {
        //     ...books[bookIndex],
        //     ...bookUpdates
        // }
        res.send(status)
    }

    const deleteBook = async (req, res) => {
        const bid = req.params['bid']
        const status = booksDao.deleteBook(bid)
        res.send(status)
    }

    app.post('/books', createBook)
    app.get('/books', findAllBooks)
    app.put('/books/:bid', updateBook)
    app.delete('/books/:bid', deleteBook)
}
export default BooksController;

