// const {UserModel, BookModel} = require("../models");
const UserModel = require("../models/user-model");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json({
    message: "server is up and running",
    data: users,
  });
};

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
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
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOne({
    _id: id,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  return res.status(200).json({
    Success: true,
    message: "user deleted successfully",
    data: users,
  });
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedUserData = await UserModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: { ...data },
    }
  );

  return res.status(200).json({
    success: true,
    message: " user is updated successfully",
    data: updatedUser,
  });
};

exports.createNewUser = async (req, res) => {
  const { name, surname, email, subscriptionType, subscriptionDate } = req.body;
  const newUser = await userModel.create({
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(200).json({
    sucess: true,
    data: newUser,
  });
};

exports.getSubscriptionDetailsById = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user)
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };
  const subscriptionType = (date) => {
    if (user.subscriptionType === "basic") {
      date = date + 90;
    } else if (user.subscriptionType === " standard") {
      date = date + 180;
    } else if (user.subscriptionType === "premium") {
      date = date + 365;
    }
    return date;
  };
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };
  res.status(200).json({
    success: true,
    data,
  });
};
