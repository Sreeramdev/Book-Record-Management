const express = require("express");
// Json data Import
const { users } = require("./data/users.json");
const usersRouter = require("./routes/users.js");
const booksRouter = require("./routes/books");

const app = express();

const PORT = 8081;

app.use(express.json());

/**
* route : /users
method : get
description: get all users
acess: public
parameters:none
*/

// Mounting routers

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running",
  });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
