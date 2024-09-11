const { connect, Schema, model } = require("mongoose");
const { roles } = require("../config/roles"); // Import roles configuration

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
    unique: true, // Ensure emails are unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    enum: [roles.admin, roles.std, roles.tch], // Reference the roles
    default: roles.std, // Default role is 'std'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User model
module.exports = model("User", userSchema);
