const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{ type: String, required: true }],
  solution: {
    type: number,
    required: true,
  },
});

const testModel = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  testName: {
    type: String,
  },
  questions: [questionSchema],
});
