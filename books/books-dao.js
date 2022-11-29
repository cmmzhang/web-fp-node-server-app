import booksModel from "./books-model.js";

export const createBook = async (book) => {
    const actualBook = await booksModel.create(book)
    return actualBook
}

export const findAllBooks = async () => {
    const allBooks = await booksModel.find()
    return allBooks
}

export const deleteBook = async (bid) => {
    const status = await booksModel.deleteOne({_id: bid})
    return status
}

export const updateBook = async (bid, bookUpdates) => {
    const status = booksModel.updateOne({_id: bid}, {$set: bookUpdates})
    return status
}