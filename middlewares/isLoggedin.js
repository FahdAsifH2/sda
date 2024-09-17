const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config();

const checkUser = (userRole, specifiedRole) => {
  if (userRole === specifiedRole) return true;
  return false;
};

class Auth {
  secret;
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  async authenticate(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
      res.redirect("/login");
    }
    try {
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      const user = await User.findById(decoded.id);
      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        role: user.role,
      };
      next();
    } catch (err) {
      console.log(err.message);
      res.redirect("/login");
    }
  }

  verified(req, res, next) {
    try {
      if (req.user?.isVerified) next();
      throw new Error("Not verified");
    } catch (error) {
      console.log(error.message);
      res.redirect("/verify");
    }
  }

  authorizeAdmin(req, res, next) {
    try {
      if (checkUser(req.user.role, 1)) next();
      throw new Error("Not authorized");
    } catch (error) {
      console.log(error.message);
      res.redirect("login");
    }
  }

  authorizeStudent(req, res, next) {
    try {
      if (checkUser(req.user.role, 2)) next();
      throw new Error("Not authorized");
    } catch (error) {
      console.log(error.message);
      res.redirect("login");
    }
  }

  authorizeTeacher(req, res, next) {
    try {
      if (checkUser(req.user.role, 3)) next();
      throw new Error("Not authorized");
    } catch (error) {
      console.log(error.message);
      res.redirect("login");
    }
  }
}

const auth = new Auth();
module.exports = auth;
