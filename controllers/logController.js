const Log = require("../models/logModel")

exports.getAllLogs = async (req,res) => {
  try{
    const logs = await Log.find();
    res.status(200).json({
      logs: logs
    })
  }catch(err) {
    res.status(400).json({message: err.message})
  }
}