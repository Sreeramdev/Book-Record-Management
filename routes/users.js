const express = require("express");

const { users } = require("../data/users.json");

const usersRouter = express.Router();

usersRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  return res.status(200).json({
    message: "true",
    data: user,
  });
});

usersRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running",
  });
});

usersRouter.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).json({
      success: false,
      message: "user exist with this id",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  res.status(200).json({
    sucess: true,
    data: users,
  });
});

usersRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "user not found" });
  const updatedUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: " user is updated successfully",
    data: updatedUser,
  });
});

usersRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    Success: true,
    message: "user deleted successfully",
    data: users,
  });
});

module.exports = usersRouter;
