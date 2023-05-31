const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/userModel')

exports.createUser = async (req,res) => {
  try{
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      username: req.body.username,
      password: password
    }
    await User.create(newUser);
    res.status(201).json({
      message: 'registered successfully';
    })
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}