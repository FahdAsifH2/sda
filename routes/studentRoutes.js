const express = require("express");
const router = express.Router();
const auth = require("../middlewares/isLoggedin");

router.get("/home", auth.authenticate, auth.verified, (req, res) => {
  res.render("student/home");
});

module.exports = router;
