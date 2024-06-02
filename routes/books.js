const express = require("express");

const booksRouter = express.Router();

const { books } = require("../data/books.json") 

const {users } = require("../data/users.json")


booksRouter.get("/",(req,res)=>{
    res.status(202).json({
        message : "true",
        data : books,
    })
})

booksRouter.get("/:id",(req,res)=>{
    const id = req.params.id;
    const book = books.find((each)=>each.id===id)
        if(!book){
            return res.status(404).json({
                success : "false",
                message : "book not found",
            })
       
        }
        return res.status(202).json({
            success : "true",
            data : book,    
    })  
})

booksRouter.get("/issued/by-books", (req,res)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    }) 
    const issuedBooks = [];
    usersWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id===each.issuedBook)

        book.issuedBy = each.name
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    }) ;
    if(issuedBooks.length===0){
       return res.status(404).json({
        success : "false",
        message : "no books issued",
       })

      
    }
    return res.status(200).json({
        success : "true",
        data : issuedBooks,
       })
})
module.exports = booksRouter;
