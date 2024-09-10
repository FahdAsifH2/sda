// userModel.js
const { connect, Schema, model } = require("mongoose");

// Connect to the MongoDB database
connect("mongodb://localhost:27017/PrepMaster")
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define the user schema
const userSchema = new Schema({
  fullName: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model
module.exports = model("User", userSchema);



// //mongo db boiler plate code
// const mongoose = require("mongoose")
// mongoose.connect ("mongodb://localhost:27017/PrepMaster")


// const userScheema = mongoose.Schema ( {
//   name: String,
//   fullName: String,
//   email : String,
//   password: String
// })

// module.exports=mongoose.model("user",userScheema)