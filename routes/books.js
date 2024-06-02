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

booksRouter.post("/", (req,res)=>{
    const {data} = req.body;


    if (!data) {
        return res.status(400).json({
            success: "false",
            message: "data is required",
        })
        
    }
    const book = books.find((each) => each.id === data.id);
    if (book) {
        return res.status(404).json({
            success: "false",
            message: "book already exists",
        })
        
    }
    const allBooks = [...books, data];
    return res.status(201).json({
        success : "true",
        data : allBooks,
    })
})

booksRouter.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    const book = books.find((each)=>each.id===id);

    if (!book) {
        return res.status(404).json({
            success: "false",
            message: "book not found",
        }) 
    }
    const updatedData = books.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        success : "true",
        data : updatedData,
    })

})


module.exports = booksRouter;
