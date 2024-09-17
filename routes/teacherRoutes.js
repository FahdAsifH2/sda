const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("teacher/home");
});

module.exports = router;
