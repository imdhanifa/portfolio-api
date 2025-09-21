import sgMail from "../config/sendgrid.js";

export const sendContactMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // 1️⃣ Email to portfolio owner
  sgMail
    .send({
      to: process.env.OWNER_EMAIL,      // your inbox
      from: process.env.SENDGRID_FROM,    // must be verified sender
      subject: `📩 New Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })
    .then(() => console.log("✅ Mail sent to portfolio owner"))
    .catch((err) => console.error("❌ Error sending to owner:", err.response?.body || err.message));

  // 2️⃣ Auto-reply to user
  sgMail
    .send({
      to: email,                           // visitor’s email
      from: process.env.SENDGRID_FROM,     // must be verified in SendGrid
      subject: `✅ Thank you for visiting my portfolio, ${name}!`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out through my portfolio website 🎉</p>
        <p>I’ll get back to you as soon as possible.</p>
        <p>Best regards,<br/>
        ${process.env.NAME || "My Portfolio"}<br/>
        <a href="${process.env.LINKEDIN || "#"}">LinkedIn</a> | 
        <a href="${process.env.GITHUB || "#"}">GitHub</a>
        </p>
      `,
    })
    .then(() => console.log(`✅ Auto-reply sent to ${email}`))
    .catch((err) => console.error("❌ Error sending auto-reply:", err.response?.body || err.message));

  // ✅ Respond immediately without waiting for email to finish
  res.status(200).json({ success: true, message: "Message is being processed" });
};
