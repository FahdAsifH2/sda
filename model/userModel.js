const { connect, Schema, model } = require("mongoose");
const { roles } = require("../config/roles"); // Import roles configuration

// Connect to the MongoDB database
connect("mongodb://localhost:27017/PrepMaster")
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define the user schema
const userSchema = new Schema({
  fullName: 
  {
    type: String,
    minLength: 3,
    trim: true,
  },
  email:
   {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
  },
  password: 
  {
    type: String,
    required: true,
  },
  role:
   {
    type: Number,
    enum: [roles.admin, roles.std, roles.tch], // Reference the roles
    default: roles.std, // Default role is 'std'
  },
  //generate 6 digit code . when the user registers and put the code in this attribute
  //verification code expires within 5 minz
  // user.veri = genVeriCode...
  // current time = ct + 5



  // database has the verificatiion code and expiry
  //register -> login -> middlware will redirects unverified user
  // it will take it to input form for OTP
  // nodemailer ->  setup in Email pass in .env the password for nodemailer ?
  // goto google settig app passwords
  // we will generate password
  // it will be a kind of a token 
  // store
  //generate the code and send it to the register email
  // and that code is safed  
  isVerified:
  {
    type : Boolean,
    default : false

  },
  verificationCode:
  {
     type: Number
  },
  verificationCodeExpires:
  {
    type:Date

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


//Create and export the User model
module.exports = model("User", userSchema);
