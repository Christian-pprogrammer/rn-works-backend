const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const Equipment = require("../models/equipmentModel")

exports.createEquipment = async (req,res) => {
  try{
    const created = await Equipment.create(req.body);
    res.status(201).json(created);
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}

exports.listEquipment = async (req,res) => {
  try{
    const equipments = await Equipment.find();
    res.status(200).json(equipments);
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}

exports.deleteEquipment = async (req,res) => {
  try{
    const user = await User.findById(req.user._id);
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    console.log(validPassword)
    if(!validPassword) {
      return res.status(403).json({message: 'Forbidden'})
    }else{
      const equipment = await Equipment.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "deleted successfully"
      });
    }
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}