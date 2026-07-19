const nodemailer = require("nodemailer");

// Agar .env me EMAIL_USER/EMAIL_PASS set nahi hai, to hum email bhejne ki
// koshish nahi karenge — bas console me link print kar denge.
// Isse project bina Gmail setup ke bhi 100% chalega (demo/college submission ke liye best).
const sendEmail = async ({ to, subject, text, html }) => {
  const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

  if (!emailConfigured) {
    console.log("\n===== EMAIL NOT CONFIGURED (showing content instead) =====");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Content:", text);
    console.log("=============================================================\n");
    return { simulated: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"TaskFlow" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });

  return { simulated: false };
};

module.exports = sendEmail;
