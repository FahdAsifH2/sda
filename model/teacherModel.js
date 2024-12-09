// zainab's code
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
    subjects: {
      type: [String], // Correctly defined as an array of strings
      required: true, // Ensures this field must be provided
    },
    DateOfBirth: {
      type: Date,
      required: true, // Ensures this field must be provided
    },
    phone: {
      type: String,
      required: true, // Ensures this field must be provided
    },
    name: {
      type: String,
      required: true, // Ensures this field must be provided
    },
    TeacherEmail:{
     type:String,
     required:true
    },
    stream: {
      type: String,
      required: true, // Ensures this field must be provided
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

module.exports = mongoose.model("Teacher", teacherSchema);
