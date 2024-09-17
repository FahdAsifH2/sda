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
      res.send("No token");
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
      res.send(err.message);
    }
  }

  verified(req, res, next) {
    try {
      if (req.user?.isVerified) next();
      throw new Error("Not verified");
    } catch (error) {
      res.send(error.message);
    }
  }

  authorizeAdmin(req, res, next) {
    try {
      if (checkUser(req.user.role, 1)) next();
      throw new Error("Not authorized");
    } catch (error) {
      res.send(error.message);
    }
  }

  authorizeStudent(req, res, next) {
    try {
      if (checkUser(req.user.role, 2)) next();
      throw new Error("Not authorized");
    } catch (error) {
      res.send(error.message);
    }
  }

  authorizeTeacher(req, res, next) {
    try {
      if (checkUser(req.user.role, 3)) next();
      throw new Error("Not authorized");
    } catch (error) {
      res.send(error.message);
    }
  }
}

const auth = new Auth();
module.exports = auth;
