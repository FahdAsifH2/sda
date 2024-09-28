const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const {registerUser}= require("../controller/authController");

const 
{
  loginUser,
  registerStudent,
  registerTeacher,
  registerAdmin,
  verifyOtp,
} = require("../controller/authController");
const auth = require("../middlewares/isLoggedin");
const { isValidObjectId } = require("mongoose");

// Define specific routes for each page
router.get("/about", (req, res) => 
{
  res.render("about");
});



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

router.get("/gallery", (req, res) => {
  res.render("gallery");
});


//when press stdRegsiter than rander this
router.get("/stdRegister",(req,res)=>
{
  res.render("registerStudent")
})

router.get("/mcq", (req, res) => 
{
  res.render("mcq");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/news", (req, res) => {
  res.render("news");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/staff", (req, res) => {
  res.render("staff");
});

//
router.post("/register/student", registerStudent)
{
  console.log("function worked")
}


router.post("/register/teacher", registerTeacher);




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
  res.render("verify");
});
router.post("/verify", auth.authenticate, verifyOtp);

router.get
(
  "/protect",
  auth.authenticate,
  auth.verified,
  auth.authorizeStudent,
  (req, res) => res.send("You are logged in")
);

module.exports = router;
