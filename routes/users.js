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

usersRouter.get("/subscription-details/:id",(req,res)=>{
    const {id} = req.params;

    const user = users.find((each)=>each.id===id)

    if(!user)
        return res.status(404).json({
            success : false,
            message : "user not found"
        })
    const getDateInDays = (data = "")=> { 
        let date;
        if(data === ''){
            date = new Date();
        }else{
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24))
        return days;
    };
    const subscriptionType =(date)=> {
        if (user.subscriptionType === 'basic') {
            date = date + 90;
            
        }else if(user.subscriptionType === ' standard'){
            date = date + 180;
        }else if(user.subscriptionType === 'premium'){
            date = date + 365;
        }
        return date;
    };
    let returnDate  = getDateInDays(user.returnDate)
    let currentDate = getDateInDays()
    let subscriptionDate = getDateInDays(user.subscriptionDate)
    let subscriptionExpiration = subscriptionType(subscriptionDate)

    const data ={
        ...user,
        subscriptionExpired : subscriptionExpiration < currentDate,
        daysLeftForExpiration : subscriptionExpiration <= currentDate ?  0 : subscriptionExpiration - currentDate,
        fine:
        returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100  : 0,

    }
    res.status(200).json({
        success : true,
        data,
    })

})
module.exports = usersRouter;
