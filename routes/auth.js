const express = require("express");
const router = express.Router();
const auth = require("../middlewares/isLoggedin");

const {
  loginUser,
  registerStudent,
  registerTeacher,
  registerAdmin,
  verifyOtp,
} = require("../controller/authController");

// Define specific routes for each page
router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/register", (req, res) => {
  console.log("register get");
  res.render("register");
});

// Contact Page Route
router.get("/contact", (req, res) => {
  res.render("contact");
});

// Gallery Page Route
router.get("/gallery", (req, res) => {
  res.render("gallery");
});

// Login Page Route
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
router.post("/register/student", registerStudent);

// Teacher Registration Routes
router.get("/register/teacher", (req, res) => {
  res.render("teacher/register"); // Assuming a similar structure for teacher
});
router.post("/register/teacher", registerTeacher);

// Admin Registration Routes
router.post("/register/admin", registerAdmin);

// Login Submission Route
router.post("/login", loginUser);

// OTP Verification Routes
router.get("/verify", auth.authenticate, (req, res) => {
  res.render("verify");
});
router.post("/verify", auth.authenticate, verifyOtp);

// Example Protected Route
router.get(
  "/protect",
  auth.authenticate,
  auth.verified,
  auth.authorizeStudent, // Adjust as per role-based logic
  (req, res) => res.send("You are logged in")
);

module.exports = router;
