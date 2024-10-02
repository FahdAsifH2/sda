const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const auth = require("../middlewares/isLoggedin");
=======
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const {registerUser}= require("../controller/authController");
>>>>>>> 24d26cce56992ded0a3b88ea7221c8cf60495cf5

const 
{
  loginUser,
  registerStudent,
  registerTeacher,
  registerAdmin,
  verifyOtp,
} = require("../controller/authController");

// Define specific routes for each page
router.get("/about", (req, res) => 
{
  res.render("about");
});

<<<<<<< HEAD
router.get("/register", (req, res) => {
  console.log("register get");
  res.render("register");
});

// Contact Page Route
router.get("/contact", (req, res) => {
  res.render("contact");
});

// Gallery Page Route
=======


router.get('/register', (req,res) =>
{
    console.log("register get")
    res.render('register');
});


  
// yaha focus krna
  router.post("/registerUser", registerUser)
   

router.get("/contact", (req, res) => 
{
  res.render("contact");
});

router.get("/elements", (req, res) => 
{
  res.render("elements");
});

>>>>>>> 24d26cce56992ded0a3b88ea7221c8cf60495cf5
router.get("/gallery", (req, res) => {
  res.render("gallery");
});

<<<<<<< HEAD
// Login Page Route
=======

//when press stdRegsiter than rander this
router.get("/stdRegister",(req,res)=>
{
  res.render("registerStudent")
})

router.get("/mcq", (req, res) => 
{
  res.render("mcq");
});

>>>>>>> 24d26cce56992ded0a3b88ea7221c8cf60495cf5
router.get("/login", (req, res) => {
  res.render("login");
});

// Signup Page Route
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Student Registration Routes
router.get("/register/student", (req, res) => {
  res.render("student/register"); // Correct path to student/register.ejs
});
<<<<<<< HEAD
router.post("/register/student", registerStudent);
=======

//
router.post("/register/student", registerStudent)
{
  console.log("function worked")
}

>>>>>>> 24d26cce56992ded0a3b88ea7221c8cf60495cf5

// Teacher Registration Routes
router.get("/register/teacher", (req, res) => {
  res.render("teacher/register"); // Assuming a similar structure for teacher
});
router.post("/register/teacher", registerTeacher);

<<<<<<< HEAD
// Admin Registration Routes
router.post("/register/admin", registerAdmin);

// Login Submission Route
router.post("/login", loginUser);

// OTP Verification Routes
router.get("/verify", auth.authenticate, (req, res) => {
=======



//router.post("/teacher/register", registerTeacher);

router.post("/register/admin", registerAdmin);

router.get("/register/student", (req, res) => 
{
  res.render("student/register");
});

router.get("/register/teacher", (req, res) => 
{
  res.render("teacher/register");
});




router.post("/register/teacher", registerTeacher);


router.post("/login", loginUser);


router.get("/verify", auth.authenticate, (req, res) => 
{
>>>>>>> 24d26cce56992ded0a3b88ea7221c8cf60495cf5
  res.render("verify");
});



router.post("/verify", auth.authenticate, verifyOtp);

<<<<<<< HEAD
// Example Protected Route
router.get(
=======
router.get
(
>>>>>>> 24d26cce56992ded0a3b88ea7221c8cf60495cf5
  "/protect",
  auth.authenticate,
  auth.verified,
  auth.authorizeStudent, // Adjust as per role-based logic
  (req, res) => res.send("You are logged in")
);

module.exports = router;
