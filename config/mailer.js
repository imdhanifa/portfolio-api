import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.rediffmailpro.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER, // full email
    pass: process.env.EMAIL_PASS, // password
  },
  name: "portfolioapi.com", // 👈 fake it with your project domain
  tls: {
    rejectUnauthorized: false, // sometimes needed with Rediff
  },
});


export default transporter;
