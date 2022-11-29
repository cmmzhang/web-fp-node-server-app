import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import BooksController from "./books/books-controller.js";
import LikesController from "./likes/likes-controller.js";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4
}

mongoose.connect('mongodb://localhost:27017/web5610', options);

const app = express();
app.use(cors());
app.use(express.json());
BooksController(app);
LikesController(app);
app.listen(4000)