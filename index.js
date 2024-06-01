const express = require("express");
// Json data Import
const {users} = require("./data/users.json")
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

app.get("/users",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    });
});

app.get("/users/:id", (req,res)=>{
    const {id} = req.params;
    const user = users.find((each) => each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
            });
            }

           return res.status(200).json({
            message : "true",
            data : user,
           }) 
        })

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "server is up and running"
    })
})

app.post("/users", (req,res)=>{
    const {id,name,surname,email,subscriptionType, subscriptionDate} = req.body;
    const user = users.find((each)=> each.id===id)
    if(user){
       return res.status(404).json({
            success:false,
            message:"user exist with this id"
        })
    }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate
  })
  res.status(200).json({
    sucess : true,
    data :users,

  })
});

app.put("/users/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    const user = users.find((each) => each.id===id)

    if(!user)
        return res.status(404).json({success:false, message:"user not found"})
    const updatedUser=users.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data,
            }
        }
        return each
    })
  return res.status(200).json({
    success : true,
    message : " user is updated successfully",
    data : updatedUser,
  })
})


app.get("*", (req,res)=>{
    res.status(404).json({
        message: "Route not found"
    })
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})