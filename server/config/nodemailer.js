import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,          // true only if using port 465
  requireTLS: true,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Check SMTP connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Verify Error:", error);
  } else {
    console.log("✅ SMTP Server is ready");
  }
});

export default transporter;
