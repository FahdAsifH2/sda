const jwt = require("jsonwebtoken");

class TokenGenerator {
  constructor() {
    if (!TokenGenerator.instance) {
      TokenGenerator.instance = this;
    }

    return TokenGenerator.instance;
  }

  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
  }
}

const instance = new TokenGenerator();
module.exports = instance;
