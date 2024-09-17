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

const sendEmailNotification = async (to, subject, message) => {
  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    res.status(500).send({ msg: { title: error.message } });
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

module.exports.registerStudent = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await createUser(email, password);

    const user = new User({
      _id: new mongoose.Types.ObjectId().toString(),
      name: name,
      email: email,
      password: hashedPassword,
      verificationCode: generateVerificationToken(),
      verificationCodeExpires: expiry(300),
      role: roles.student,
    });
    const student = new Student({
      _id: new mongoose.Types.ObjectId().toString(),
      userId: user._id,
    });
    await user.save();
    await student.save();
    const message = emailVerificationMessage(user);
    // await sendEmailNotification(user.email, message.subject, message.body);

    const token = TokenGenerator.generateToken(user._id);

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

module.exports.registerTeacher = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await createUser(email, password);

    const user = new User({
      _id: new mongoose.Types.ObjectId().toString(),
      name: name,
      email: email,
      password: hashedPassword,
      verificationCode: generateVerificationToken(),
      verificationCodeExpires: expiry(300),
      role: roles.teacher,
    });
    const teacher = new Teacher({
      _id: new mongoose.Types.ObjectId().toString(),
      userId: user._id,
    });
    await user.save();
    await teacher.save();
    const message = emailVerificationMessage(user);
    // await sendEmailNotification(user.email, message.subject, message.body);

    const token = TokenGenerator.generateToken(user._id);

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.registerAdmin = async (req, res) => {
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
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

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
        switch (user.role) {
          case 1:
            console.log("admin");
            //redirect to admin page
            break;
          case 2:
            console.log("student");
            //redirect to student page
            break;
          case 3:
            console.log("teacher");
            //redirect to teacher page
            break;
        }
        res.status(200).send("Login successful");
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
    const otp = Number(req.body.otp);

    const user = await User.findOne({
      _id: req.user._id,
      verificationCode: otp,
      verificationCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid or expired token. 😣");
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;

    await user.save();

    res.status(200).send({
      msg: {
        title: "Email verified successfully! 🥳",
        desc: "You can now start using the app.",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};
