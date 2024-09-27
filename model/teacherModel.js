const mongoose = require("mongoose");


const subjects = 
{
  sciences: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Agriculture', 'Engineering'],
  humanities: ['History', 'Geography', 'Psychology', 'Economics', 'Sociology', 'Anthropology', 'Political Science'],
  commerce: ['Accounting', 'Business', 'Economics', 'Mathematics']
}


const teacherSchema = new mongoose.Schema(
  {
    userId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tests: 
    [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],

   
    subjects:
    {
      sciences: 
      {
        type: [String],
      enum : subjects.sciences,
      },

      humanities:
      {
        type: [String],
      enum : subjects.humanities,
      },
       
      commerce:
      {
        type: [String],
      enum : subjects.commerce,
      },
        
    },

    DateOfBirth :
    {
      type: Date,
      required: true,
    },

    phone:
    {
      type: String,
      requred: true,
    },
    Name:
    {
      type: String,
      requred: true,
    },
  

  },
  

  { timestamps: true }
);
module.exports = mongoose.model("Teacher", teacherSchema);
