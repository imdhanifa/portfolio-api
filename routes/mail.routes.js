import express from "express";
import { sendContactMessage } from "../controllers/mail.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mail
 *   description: Mail management
 */
/**
 * @swagger
 * /api/mail:
 *   post:
 *     summary: Send a contact message
 *     tags: [Mail]
 *     description: Sends a message from portfolio contact form to the portfolio owner and an auto-reply to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               message:
 *                 type: string
 *                 example: Hello, I love your portfolio!
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Message sent successfully!
 *       400:
 *         description: Bad Request (missing fields)
 *       500:
 *         description: Internal Server Error (email failed)
 */
router.post("/", sendContactMessage);

export default router;
