const express = require('express');
const router = express.Router();

// Route for student registration
router.get('/register', (req, res) => {
    res.render('student/register'); // Ensure this points to the correct view
});

// Add more student-related routes here...

module.exports = router;
