import * as likesDao from "./likes-dao.js";

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
  const userUnlikesBook = async (req, res) => {
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
  const findUsersWhoLikedBook = async (req, res) => {
    const bid = req.params.bid
    const users = await likesDao.findUsersThatLikeBook(bid)
    res.json(users)

  }

  app.post('/users/:uid/likes/:bid', userLikesBook)
  app.delete('/users/:uid/likes/:bid', userUnlikesBook)
  app.get('/likes', findAllLikes)
// return book name only 
  app.get('/users/:uid/likes', findBooksLikedByUser)
// return user object with _id and username 
  app.get('/books/:bid/likes', findUsersWhoLikedBook)
}

export default LikesController;