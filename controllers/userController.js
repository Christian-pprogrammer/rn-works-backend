const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

exports.createUser = async (req,res) => {
  console.log(req.body.password)
  console.log(req.body)
  try{
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      username: req.body.username,
      password: password
    }
    const created = await User.create(newUser);
    const token = generateToken(created);
    res.status(201).json({
      message: 'registered successfully',
      user: created,
      token: token
    })
  }catch(err) {
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
}

exports.loginUser = async (req,res) => {
  try{
    const userExists = await User.findOne({username: req.body.username})
    if(!userExists) {
      return res.status(400).json({
        message: 'incorrect username or password'
      })
  }
    const correctPassword = await bcrypt.compare(req.body.password, userExists.password)
    if(correctPassword) {
      const token = generateToken(userExists);
      res.status(201).json({
        message: 'login successful',
        user: userExists,
        token: token
      })  
    }else{
      res.status(403).json({message: 'incorrect username or password'})
    }
    
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}
