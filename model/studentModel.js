const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testsBought: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
    Studentemail:
    {
      type:String,
      required:true
    },
    stream:
    {
      type : String,
      requird:true,
    },
    dob:
    {
      type : String,
      requird:true,
    },
    test:
    {
     type: [String],
     require: true
    },
    name:
    {
      type : String,
      requird:true,
    },
      
    fathername:
    {
      type : String,
      requird:true,
    },

    mothername:
    {
      type : String,
      requird:true,
    },

    collage:
    {
      type : String,
      requird:true,
    },
    phone:
    {
      type : String,
      requird:true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
