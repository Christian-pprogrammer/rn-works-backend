const mongoose = require('mongoose');

const connect = async () => {
  try{
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('db connect successfull...');
  }catch(err) {
    console.log(err);
  }
}

module.exports = connect;