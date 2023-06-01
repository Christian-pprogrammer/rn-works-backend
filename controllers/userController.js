const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/userModel');
const Log = require('../models/logModel');
const generateToken = require('../utils/generateToken');

exports.createUser = async (req,res) => {
  try{
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      username: req.body.username,
      password: password
    }
    const created = await User.create(newUser);
    const date = new Date()
    const newLog = {
      username: created.username,
      logMessage: `${created.username} registered successfully`,
      date: date.toDateString(),
      time: date.toTimeString()
    }
    await Log.create(newLog);
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
      const date = new Date()
      const newLog = {
        username: userExists.username,
        logMessage: `${userExists.username} logged in successfully`,
        date: date.toDateString(),
        time: date.toTimeString()
      }
      await Log.create(newLog);
      res.status(201).json({
        message: 'login successful',
        user: userExists,
        token: token
      })  
    }else{
      res.status(401).json({message: 'incorrect username or password'})
    }
    
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}
