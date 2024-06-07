const express = require("express");


const { books } = require("../data/books.json") 

const {users } = require("../data/users.json")

//const BookModel = require("../models/book-model")
//const UserModel = require("../models/user-model")

const {UserModel, BookModel} = require("../models");
const { getAllBooks,
    getSingleBookById, 
    getAllIssuedBooks,
     addNewBook, 
     updateBookById} = require("../controllers/book-controllers");

const booksRouter = express.Router();


booksRouter.get("/",getAllBooks);

booksRouter.get("/:id",getSingleBookById);

booksRouter.get("/issued/by-books", getAllIssuedBooks);

booksRouter.post("/",addNewBook)

booksRouter.put("/:id",updateBookById)




module.exports = booksRouter;
