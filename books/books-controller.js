let books = [
    {
        _id: '123',
        title: 'b1'
    },
    {
        _id: '234',
        title: 'b2'
    },
]

const BooksController = (app) => {
    const createBook = (req, res) => {
        const book = req.body
        book["_id"] = (new Date()).getTime() + ''
        books.push(book)
        res.send(book)
    }

    const findAllBooks = (req, res) => {
        res.send(books)
    }

    const updateBook = (req, res) => {
        const bid = req.params['bid']
        const bookUpdates = req.body
        const bookIndex = books.findIndex((b) => b._id === bid)
        books[bookIndex] = {
            ...books[bookIndex],
            ...bookUpdates
        }
        res.sendStatus(200)
    }

    const deleteBook = (req, res) => {
        const bid = req.params['bid']
        books = books.filter((b) => b._id !== bid)
        res.sendStatus(200)
    }

    app.post('/books', createBook)
    app.get('/books', findAllBooks)
    app.put('/books/:bid', updateBook)
    app.delete('/books/:bid', deleteBook)
}
export default BooksController;

