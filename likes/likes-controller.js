import {getBooks} from "../books/books-controller.js";
import users from "../users/users.js";

let likes = [
  {_id: 'like123', user: '111', book: '123'},
  {_id: 'like234', user: '111', book: '234'},
  {_id: 'like345', user: '222', book: '123'},
  {_id: 'like456', user: '333', book: '234'},
]

const LikesController = (app) => {
  const populate = (
      {
        rawResults, fieldToPopulate,
        sourceData, sourceField
      }) => {
    const populatedResults = rawResults.map((raw) => {
      const source = sourceData.find(source => source[sourceField] === raw[fieldToPopulate])
      return ({
        ...raw,
        [fieldToPopulate]: source
      })
    })
    return populatedResults
  }
  const userLikesBook = (req, res) => {
    const uid = req.params.uid
    const bid = req.params.bid
    const newLike = {
      _id: 'like'+(new Date()).getTime()+'',
      user: uid,
      book: bid
    }
    likes.push(newLike)
    res.json(newLike)
  }
  const userUnlikesBook = (req, res) => {
    const uid = req.params.uid
    const bid = req.params.bid
    likes = likes.filter((l) => l.user !== uid && l.book !== bid)
    res.send(200)
  }
  const findAllLikes = (req, res) => {
    const populatedBooks = populate({
      rawResults: likes,
      fieldToPopulate: 'book',
      sourceData: getBooks(),
      sourceField: '_id'
    })
    const populateUsers = populate({
      rawResults: populatedBooks,
      fieldToPopulate: 'user',
      sourceData: users,
      sourceField: '_id'
    })
    res.json(populateUsers)
  }
  const findBooksLikedByUser = (req, res) => {
    const uid = req.params.uid
    const books = likes.filter((like) => like.user === uid)
    const populatedBooks = populate({
      rawResults: books,
      fieldToPopulate: 'book',
      sourceData: getBooks(),
      sourceField: '_id'
    })
    res.json(populatedBooks)
  }
  const findUsersWhoLikedBook = (req, res) => {
    const bid = req.params.bid
    const usersWhoLikeBook = likes.filter((like) => like.book === bid)
    const populateUsers = populate({
      rawResults: usersWhoLikeBook,
      fieldToPopulate: 'user',
      sourceData: users,
      sourceField: '_id'
    })
    res.json(populateUsers)
  }

  app.post('/users/:uid/likes/:bid', userLikesBook)
  app.delete('/users/:uid/likes/:bid', userUnlikesBook)
  app.get('/likes', findAllLikes)
  app.get('/users/:uid/likes', findBooksLikedByUser)
  app.get('/books/:bid/likes', findUsersWhoLikedBook)
}

export default LikesController;