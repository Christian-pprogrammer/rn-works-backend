const dotenv = require('dotenv');
dotenv.config({path: './.env'})
const connect = require('./db_connection');
connect();
const express = require("express");
const router = require('./router');
const app = express();

app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
  console.log(`app listening on port ${PORT}`)
})