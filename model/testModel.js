const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [
        {
            option: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
            text: { type: String, required: true }
        }
    ],
    correctOption: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: false }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
