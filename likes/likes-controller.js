import * as likesDao from "./likes-dao.js";

let likes = [
  {_id: '123', user: '111', book: '123'},
  {_id: '234', user: '111', book: '234'},
  {_id: '345', user: '222', book: '345'},
  {_id: '456', user: '333', book: '345'},
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
  }
  const userUnlikeBook = async (req, res) => {
    const uid = req.params.uid
    const bid = req.params.bid
    const status = await likesDao.userUnlikesBook(uid, bid)
    res.send(status)
  }
  const findAllLikes = async (req, res) => {
    const likes = await likesDao.findAllLikes()
    res.json(likes)
  }
  const findBooksLikedByUser = async (req, res) => {
    const uid = req.params.uid
    const books = await likesDao.findBooksLikedByUser(uid)
    res.json(books)
  }
  const findUsersWhoLikeBook = async (req, res) => {
    const bid = req.params.bid
    const users = await likesDao.findUsersThatLikeBook(bid)
    res.json(users)
  }

  app.post('/users/:uid/likes/:bid', userLikesBook)
  app.delete('users/:uid/unlikes/:bid', userUnlikeBook)
  app.get('/likes', findAllLikes)
  app.get('/users/:uid/likes', findBooksLikedByUser)
  app.get('books/:bid/likes', findUsersWhoLikeBook)
}

export default LikesController;