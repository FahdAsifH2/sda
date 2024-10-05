const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//     question: { type: String, required: true },
//     options: [
//         {
//             text: { type: String, required: true }
//         }
//     ],
//     correctOption: { type: String, required: true, enum: ['A', 'B', 'C', 'D'] }
// });

// const testSchema = new mongoose.Schema({
//     testName: { type: String, required: true },
//     questions: [questionSchema]
// });

// // Create and export the model
// const Test = mongoose.model('Test', testSchema);
// module.exports = Test;






const TestSchema = new mongoose.Schema({
    question: { type: String, required: true },  // The main question text
    options: [
        {
            option: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },  // Option identifier (A, B, C, or D)
            text: { type: String, required: true }  // Option text (e.g., "Paris")
        }
    ],
    correctOption: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },  // Correct answer identifier
    testName: { type: String, required: true }  // Name of the test/paper
});

// Create the Question model
const Test = mongoose.model('Test', TestSchema);

module.exports = Test;





