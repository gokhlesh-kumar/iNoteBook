const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // to validate the email and name 
const bcrypt = require('bcrypt'); //to encrypt the password of the user and then store it in db
const jwt = require('jsonwebtoken'); //to generate token of a hash value
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'creatingiNoteBook';

// Route 1: Create a user using: POST "/api/auth/createuser" No login required
router.post('/createuser', [
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
] ,async(req, res) => {

  let success = false;

  // If there are errors return error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try{
    // Search whether user already exist or not
    let user = await User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({success, error: "Sorry user with email already exist"})
    }

    //generating salt to add after the password
    const salt = await bcrypt.genSalt(10);
    //binding the salt and password and then generating the hash
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    
    
    // Insert user details
    user = await User.create({
      name: req.body.name,
      password: hashPassword,
      email: req.body.email,
    });
    // .then(user => res.json(user)).catch(err => res.json({message : 'Invalid email', error : err.message}));
    

    const data = {
      user: {
        id:user.id
      }
    }
    const token = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, token});

  }
  catch(error){
    res.status(500).json({success, error : "Some error occured"});
  }
})




// Route 2:  Login a user using: POST "/api/auth/login" No login required
router.post('/login', [
  body('email', 'invalid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
] ,async(req, res) => {

  // To chck if the user gets login
  let success = false;

// If there are errors return error message
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(500).json({success, error : 'Please try to login with correct credentials'});
    }
    

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({success, error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const token = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({token, success})
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});





// Route 3:  Get logged in User Details: POST "/api/auth/getuser" Login required
router.post('/getuser', fetchuser ,async(req, res) => {

// If there are errors return error message
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    // console.log("object")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router