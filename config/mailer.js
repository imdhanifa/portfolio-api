import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.rediffmailpro.com",
  port: 587,                 // TLS (STARTTLS)
  secure: false,             // must be false for port 587
  auth: {
    user: process.env.EMAIL_USER, // full email e.g. yourname@yourdomain.com
    pass: process.env.EMAIL_PASS, // email password or app password
  },
  name: "portfolioapi.com",
  connectionTimeout: 10000,  // 10s timeout
  greetingTimeout: 5000,     // 5s for initial response
  socketTimeout: 15000,      // 15s max per socket
});

export default transporter;
