const asyncHandler = require("express-async-handler");;  //importing express-async-handler
const User = require("../models/userModel"); //importing contact model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc register user
//@route post /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username|| !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable =  await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("user already exist");
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username, email, password:hashedPassword
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("user data not valid")
    }
    
    res.json({message:'Register the user'});
  });       
  
  //@desc login user
  //@route post /api/users/login
  //@access Public
  
  const loginUser = asyncHandler(async  (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    //compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user._id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '5m'}
    );
        res.status(200).json({accessToken});
 
    }else{
        res.status(401);
        throw new Error("Invalid credentials");
    }
  });

  //@desc current user info
  //@route post /api/users/current
  //@access Private
  
  const currentUser = asyncHandler(async  (req, res) => {
    res.json({req: req.user});
  });


  module.exports= {registerUser, loginUser, currentUser};