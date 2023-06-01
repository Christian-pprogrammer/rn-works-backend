const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const Equipment = require("../models/equipmentModel")
const Log = require('../models/logModel');

exports.createEquipment = async (req,res) => {
  try{
    const created = await Equipment.create(req.body);
    const date = new Date()
    const newLog = {
      username: req.user.username,
      logMessage: `${req.user.username} registered equipment with code ${created.code}`,
      date: date.toDateString(),
      time: date.toTimeString()
    }
    await Log.create(newLog);
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
    if(!validPassword) {
      return res.status(403).json({message: 'Forbidden'})
    }else{
      const existingEquipment = await Equipment.findById(req.params.id);
      if(!existingEquipment) {
        return res.status(400).json({message: 'equipment does not exist'})
      }
      await Equipment.findByIdAndDelete(req.params.id);
      const date = new Date()
      const newLog = {
        username: req.user.username,
        logMessage: `${req.user.username} deleted equipment with code ${existingEquipment.code}`,
        date: date.toDateString(),
        time: date.toTimeString()
      }
      await Log.create(newLog);
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

exports.editEquipment = async (req,res) => {
  try{
    const user = await User.findById(req.user._id);
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) {
      return res.status(403).json({message: 'Invalid password'})
    }else{
      const existingEquipment = await Equipment.findById(req.params.id);
      if(!existingEquipment) {
        return res.status(400).json({message: 'Equipment does not exist'});
      }
      const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      const date = new Date()
      const newLog = {
        username: req.user.username,
        logMessage: `${req.user.username} edited equipment with code ${existingEquipment.code}`,
        date: date.toDateString(),
        time: date.toTimeString()
      }
      await Log.create(newLog);
      res.status(200).json({
        message: "edited successfully"
    });
    }
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}