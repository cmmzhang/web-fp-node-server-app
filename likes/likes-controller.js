/*import {getBooks} from "../books/books-controller.js";
import users from "../users/users.js";*/
import * as likesDao from "./likes-dao.js";

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
  const userLikesBook = async (req, res) => {
    const uid = req.params.uid
    const bid = req.params.bid
    const newLike = await likesDao.userLikesBook(uid, bid)
    res.json(newLike)
/*    const newLike = {
      _id: 'like'+(new Date()).getTime()+'',
      user: uid,
      book: bid
    }
    if(likes.filter(like => like.user === uid && like.book === bid).length > 0) {
       res.status(400).json({msg:'Book already liked'})
    } else {
      likes.push(newLike)
      res.json(newLike)
    }*/
  }
  const userUnlikesBook = async (req, res) => {
    const uid = req.params.uid
    const bid = req.params.bid
    const status = await likesDao.userUnlikesBook(uid, bid)
    res.send(status)
/*    if(likes.filter(like => like.user === uid && like.book === bid).length === 0) {
      res.status(400).json({msg: 'Book has not been liked yet'})
    } else {
      likes = likes.filter((l) => l.user === uid && l.book !== bid)
      res.send(200)
    }*/
  }
  const findAllLikes = async (req, res) => {
    const likes = await likesDao.findAllLikes()
    res.json(likes)
/*    const populatedBooks = populate({
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
    res.json(populateUsers)*/
  }
  const findBooksLikedByUser = async (req, res) => {
    const uid = req.params.uid
    const books = await likesDao.findBooksLikedByUser(uid)
    res.json(books)
/*    const books = likes.filter((like) => like.user === uid)
    const populatedBooks = populate({
      rawResults: books,
      fieldToPopulate: 'book',
      sourceData: getBooks(),
      sourceField: '_id'
    })
    res.json(populatedBooks)*/
  }
  const findUsersWhoLikedBook = async (req, res) => {
    const bid = req.params.bid
    const users = await likesDao.findUsersThatLikeBook(bid)
    res.json(users)
/*    const usersWhoLikeBook = likes.filter((like) => like.book === bid)
    const populateUsers = populate({
      rawResults: usersWhoLikeBook,
      fieldToPopulate: 'user',
      sourceData: users,
      sourceField: '_id'
    })
    res.json(populateUsers)*/
  }

  app.post('/users/:uid/likes/:bid', userLikesBook)
  app.delete('/users/:uid/likes/:bid', userUnlikesBook)
  app.get('/likes', findAllLikes)
  app.get('/users/:uid/likes', findBooksLikedByUser)
  app.get('/books/:bid/likes', findUsersWhoLikedBook)
}

export default LikesController;