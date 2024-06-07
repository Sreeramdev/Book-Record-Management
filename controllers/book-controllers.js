const { UserModel, BookModel } = require("../models");
const bookModel = require("../models/book-model");

exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();

  if (books.length === 0)
    return res.status(404).json({
      message: "No books found",
      success: false,
    });
  res.status(200).json({
    message: "Books fetched successfully",
    success: true,
    data: books,
  });
};

exports.getSingleBookById = async (req, res) => {
  const id = req.params.id;
  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: "false",
      message: "book not found",
    });
  }
  return res.status(202).json({
    success: "true",
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: {
      $exists: true,
    },
  }).populate("issuedBook");

  const issuedBooks = users.map((each) => new IssuedBook(each));
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: "false",
      message: "no books issued",
    });
  }
  return res.status(200).json({
    success: "true",
    data: issuedBooks,
  });
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: "false",
      message: "data is required",
    });
  }
  await BookModel.create(data);

  const allBooks = await BookModel.find();

  return res.status(201).json({
    success: "true",
    data: allBooks,
  });
};

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: "true",
    data: updatedBook,
  });
};
//module.exports = {getAllBooks,getSingleBookById}
