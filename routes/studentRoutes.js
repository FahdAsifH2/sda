const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    res.render('student/home'); // Render the home.ejs (dashboard)
});

router.get('/solveExam', (req, res) => {
    res.render('student/solveExam');
});
router.get('/mcq', (req, res) => {
    res.render('mcq');
});
router.get('/editProfile', (req, res) => {
    res.render('student/editProfile');
});

// Route for student registration
router.get('/register', (req, res) => {
    res.render('student/register'); // Ensure this points to the correct view
});

// Add more student-related routes here...

module.exports = router;
