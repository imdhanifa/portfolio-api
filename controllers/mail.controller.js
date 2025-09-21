import transporter from "../config/mailer.js";

/**
 * Controller: Send Contact Message
 */
export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // 1️⃣ Email to portfolio owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // 2️⃣ Auto-reply to user
    await transporter.sendMail({
      from: `"${process.env.PORTFOLIO_NAME || "My Portfolio"}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Thank you for visiting my portfolio, ${name}!`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out through my portfolio website 🎉</p>
        <p>I’ll get back to you as soon as possible.</p>
        <p>Best regards,
        <br/>
        ${process.env.NAME}
        <br/>
        <a href="${process.env.LINKEDIN}">LinkedIn</a> | <a href="${process.env.GITHUB}">GitHub</a>
        </p>
      `,
    });

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
};
