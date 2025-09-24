import express from "express";
import {
  getViews,
  incrementViews,
  getLikes,
  incrementLikes,
} from "../controllers/portfolio.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: Portfolio management
 */

/**
 * @swagger
 * /api/portfolio/views:
 *   get:
 *     summary: Get current views count
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Current views count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 viewers:
 *                   type: integer
 *                   example: 10
 *   post:
 *     summary: Increment views count
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Updated views count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 viewers:
 *                   type: integer
 *                   example: 11
 */
router.get("/views", getViews);
router.post("/views", incrementViews);

/**
 * @swagger
 * /api/portfolio/likes:
 *   get:
 *     summary: Get current likes count
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Current likes count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: integer
 *                   example: 25
 *   post:
 *     summary: Increment likes count
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Updated likes count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: integer
 *                   example: 26
 */
router.get("/likes", getLikes);
router.post("/likes", incrementLikes);

export default router;

