const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Optional: Verify the transporter before sending an email
  transporter.verify(function (error, success) {
    if (error) {
      console.error("Transporter verification failed:", error);
      throw new Error("Email transporter verification failed.");
    } else {
      console.log("Server is ready to send emails.");
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
    return result; // Returning the result for further processing if needed
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error Sending Email: " + error.message);
  }
};

module.exports = sendEmail;
