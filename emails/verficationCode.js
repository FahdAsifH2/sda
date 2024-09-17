const emailVerificationMessage = (user) => {
  const message = {
    subject: "Verify Your Email with Examchamp",
    body: `
              <p>Hello ${user.name},</p>
              <p>Thank you for registering with Examchamp!<br>Please use the following OTP to verify your email:<br><strong>${user.verificationCode}</strong></p>
              <p>Regards,<br>ExamChamp<br>Your partner in preparation</p>`,
  };
  return message;
};
module.exports = { emailVerificationMessage };
