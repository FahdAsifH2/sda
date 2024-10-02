const express = require('express');
const router = express.Router();
const Question = require('../model/testModel'); // Make sure this points to the correct model

// Route to render the teacher dashboard
router.get('/home', (req, res) => {
    res.render('teacher/home'); // Render the home.ejs (dashboard)
});

// Route to render the question form
router.get('/questionForm', (req, res) => {
    res.render('teacher/questionForm');
});

// Route to handle question form submission
router.post('/submit-question', async (req, res) => {
    try {
        const { question, optionA, optionB, optionC, optionD, correctOption } = req.body;

        const newQuestion = new Question({
            question: question,
            options: [
                { option: 'A', text: optionA },
                { option: 'B', text: optionB },
                { option: 'C', text: optionC },
                { option: 'D', text: optionD }
            ],
            correctOption: correctOption,
            teacherId: null // Temporarily set to null (no authentication for now)
        });

        // Save the new question to the database
        await newQuestion.save();

        // Redirect to confirmation page with question ID
        res.redirect(`/teacher/confirmation?questionId=${newQuestion._id}`);
    } catch (error) {
        console.error('Error submitting question:', error);
        res.status(500).send('Error submitting question');
    }
});

// Route for confirmation page
router.get('/confirmation', async (req, res) => {
    try {
        const questionId = req.query.questionId;
        const question = await Question.findById(questionId);

        res.render('teacher/confirmation', { question });
    } catch (error) {
        console.error('Error loading confirmation page:', error);
        res.status(500).send('Error loading confirmation page');
    }
});

// Route to render the preview questions page
router.get('/previewQuestions', async (req, res) => {
    try {
        // Fetch all questions from the database (filter based on teacherId later)
        const questions = await Question.find({}); // You can filter by teacherId if necessary

        // Render the previewQuestions.ejs with the fetched questions
        res.render('teacher/previewQuestions', { questions });
    } catch (error) {
        console.error('Error loading preview questions:', error);
        res.status(500).send('Error loading preview questions');
    }
});

module.exports = router;
