const Admin = require("../model/adminModel");
const Teacher = require("../model/teacherModel");
const User = require("../model/userModel");
const Student = require("../model/studentModel");
const bcrypt = require("bcrypt");
const TokenGenerator = require("../utils/generateToken");
const { roles } = require("../config/roles");
const { generateVerificationToken, expiry } = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");
const { emailVerificationMessage } = require("../emails/verficationCode");
const { default: mongoose } = require("mongoose");
const Test  = require("../model/testModel")


// const sendEmailNotification = async (to, subject, message) => 
// {
//   try 
//   {
//     await sendEmail(to, subject, message);
//   } catch (error) 
//   {
//     res.status(500).send({ msg: { title: error.message } });
//   }
// };


const sendEmailNotification = async (to, subject, message) => {
  try {
    await sendEmail(to, subject, message);
  } catch (error) 
  {
    // Log the error or handle it as needed
    console.error("Error sending email notification:", error.message);
    // You might want to throw the error to handle it later
    throw new Error("Failed to send email notification.");
  }
};


const createUser = async (email, password) => {
  let user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const homeNavigator = (res, role) => {
  switch (role) {
    case 1:
      //redirect to admin page
      return res.redirect("/admin/home");
    case 2:
      //redirect to student page
      return res.redirect("/student/home");
    case 3:
      //redirect to teacher page
      return res.redirect("/teacher/home");
  }
};

module.exports.registerStudent = async (req, res) => 
{
  try 
  {

    console.log("You just entered student")
   // Destructure using the correct input names from the form
   const {
    email,
    password,
    motherName,
    fatherName,
    collageName,
    studentName,
    dateOfBirth,
    phoneNumber,
    stream,
    test,
  } = req.body;


   console.log("Name:", studentName);
   console.log("Date of Birth:", dateOfBirth);
   console.log("Phone:", phoneNumber);
   console.log("Stream:", stream)
   console.log("momName:", motherName);
   console.log("dadName:", fatherName);
   console.log("email", email);
   console.log("collage:", collageName);
   console.log("test:", test)

    const hashedPassword = await createUser(email, password);

    const user = new User({
      _id: new mongoose.Types.ObjectId().toString(),
      name: studentName,
      email: email,
      password: hashedPassword,
      verificationCode: generateVerificationToken(),
      verificationCodeExpires: expiry(300),
      role: roles.student,
    });

    const student = new Student({
      _id: new mongoose.Types.ObjectId().toString(),
      userId: user._id,
      name: studentName,
      Studentemail:email,
      mothername: motherName,
      fathername: fatherName,
      collage:collageName,
      phone: phoneNumber,
      stream,
      dob: dateOfBirth,
      test,
    });

    await user.save();
    await student.save();
    const message = emailVerificationMessage(user);
     await sendEmailNotification(user.email, message.subject, message.body);

    const token = TokenGenerator.generateToken(user._id);

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });
    res.render("verify");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};



module.exports.registerAdmin = async (req, res) => 
{
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await createUser(email, password);

    const user = new User({
      _id: new mongoose.Types.ObjectId().toString(),
      name: name,
      email: email,
      password: hashedPassword,
      role: roles.admin,
      isVerified: true,
    });
    const admin = new Admin({
      _id: new mongoose.Types.ObjectId().toString(),
      userId: user._id,
    });
    await user.save();
    await admin.save();
    const token = TokenGenerator.generateToken(user._id);

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Login User
module.exports.loginUser = async (req, res) => 
{
  const { email, password } = req.body;
  if(email === "admin@admin" && password==="admin")
  {
    console.log("Admin Pannel");

    const testdata = Test.find({});
    return res.render("admin",{testdata})
  }
 console.log("You Entered user block")
  try {
    // Check if the user exists
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("User does not exist");
    }

    // Compare password with hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        // Generate token using Singleton instance
        const token = TokenGenerator.generateToken(user._id);

        // Set the token in a cookie
        res.cookie("token", token, { httpOnly: true });
        // TODO
        homeNavigator(res, user.role);
      } else {
        res.status(400).send("Invalid password");
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    if (req.user.isVerified) throw new Error("User already verified. 🤨");
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = req.body;

    // Concatenate them into a single OTP string
    const otp = Number(`${otp1}${otp2}${otp3}${otp4}`);
    const user = await User.findOne({
      _id: req.user._id,
      verificationCode: otp,
      verificationCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid or expired code. 😣");
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;

    await user.save();
    homeNavigator(res, user.role);
  } catch (error) {
    console.log(error.message);
    res.redirect("/login");
  }
};

module.exports.registerTeacher = async (req, res) => 
{
  console.log("You just entered registerTeacher route");
  try {
    const { email, password, name, dob, phone, stream, subjects } = req.body;
    const hashedPassword = await createUser(email, password);
    
   console.log(req.body)
    const user = new User({
      _id: new mongoose.Types.ObjectId().toString(),
      name,
      email,
      password: hashedPassword,
      verificationCode: generateVerificationToken(),
      verificationCodeExpires: expiry(300),
      role: roles.teacher,
    });

    const teacher = new Teacher({
      _id: new mongoose.Types.ObjectId().toString(),
      userId: user._id,
      DateOfBirth: dob,
      phone,
      name,
      TeacherEmail:email,
      stream,
      subjects, // Set the selected subjects
    });

    await user.save();
    await teacher.save();
    const message = emailVerificationMessage(user);
    await sendEmailNotification(user.email, message.subject, message.body);

    console.log("after OTP");
    const token = TokenGenerator.generateToken(user._id);

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });
    res.render("verify");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};


// Register User
module.exports.registerUser = async (req, res) => {

  console.log("We enter the registerUser")
  try 
  {
    const { email, password, fullName } = req.body;

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Full Name:', fullName);

    // Check if the user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      console.log("User exists");
      return res.status(400).send("User already exists");
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    user = await User.create({
      email,
      password: hashedPassword, // Use the hashed password
      fullName,
    });

    // Generate token using Singleton instance
    const token = TokenGenerator.generateToken(user);

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });

    console.log("User created successfully");
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


