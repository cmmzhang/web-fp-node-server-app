import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import session from 'express-session'
import BooksController from "./books/books-controller.js";
import LikesController from "./likes/likes-controller.js";
import UsersController from "./users/users-controller.js";
import FollowsController from "./follows/follows-controller.js";
import SessionController from "./session-controller.js";
import ReviewsController from "./reviews/reviews-controller.js";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4
}

mongoose.connect('mongodb://localhost:27017/bookworms', options);

const app = express();
app.use(cors(
    {
      credentials: true,
      origin: 'http://localhost:3000'
    }
))

app.use(session({
  secret: 'should be an environment variable',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.json({}));

BooksController(app);
LikesController(app);
UsersController(app);
SessionController(app);
FollowsController(app);
ReviewsController(app);
app.listen(4000)