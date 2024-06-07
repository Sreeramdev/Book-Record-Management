const express = require("express");

const { users } = require("../data/users.json");

const {UserModel,BookModel} = require ("../models");
const { getSingleUserById,
   getAllUsers, 
   deleteUser,
   updateUserById,
   createNewUser,
   getSubscriptionDetailsById} = require("../controllers/user-controllers");



const usersRouter = express.Router();

usersRouter.get("/:id",getSingleUserById);

usersRouter.get("/",getAllUsers);

usersRouter.post("/", createNewUser);

usersRouter.put("/:id", updateUserById);

usersRouter.delete("/:id",deleteUser);

usersRouter.get("/subscription-details/:id",getSubscriptionDetailsById)
module.exports = usersRouter;
