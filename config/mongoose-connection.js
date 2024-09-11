const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

// MongoDB connection string
const mongoURL = "mongodb://localhost:27017/PrepMaster";

async function connectToDB() {
  try 
  {
    await mongoose.connect(mongoURL,
       {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });
    dbgr("Connected to MongoDB successfully");
  } catch (err) {
    dbgr("Error connecting to MongoDB:", err);
  }
}

connectToDB(); // Call the function to connect to the database

module.exports = mongoose.connection;
