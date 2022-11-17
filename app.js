import express from 'express';
import cors from 'cors';
import BooksController from "./books/books-controller.js";

const app = express();
app.use(cors());
app.use(express.json());
BooksController(app);

app.listen(4000)