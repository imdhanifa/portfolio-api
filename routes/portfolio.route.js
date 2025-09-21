import express from "express";
import {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getViewers,
  incrementViewers,
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
 * /api/portfolio:
 *   get:
 *     summary: Get portfolio
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Portfolio data
 *       404:
 *         description: Portfolio not found
 */
router.get("/", getPortfolio);

/**
 * @swagger
 * /api/portfolio:
 *   post:
 *     summary: Create portfolio
 *     tags: [Portfolio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Portfolio created
 */
router.post("/", createPortfolio);

/**
 * @swagger
 * /api/portfolio/{id}:
 *   put:
 *     summary: Update portfolio by ID
 *     tags: [Portfolio]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB document ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Portfolio updated
 *       404:
 *         description: Portfolio not found
 */
router.put("/:id", updatePortfolio);

/**
 * @swagger
 * /api/portfolio/{id}:
 *   delete:
 *     summary: Delete portfolio by ID
 *     tags: [Portfolio]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB document ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Portfolio deleted
 *       404:
 *         description: Portfolio not found
 */
router.delete("/:id", deletePortfolio);

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: Portfolio management
 */

/**
 * @swagger
 * /api/portfolio/viewers:
 *   get:
 *     summary: Get current viewers count
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Current viewers count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 viewers:
 *                   type: integer
 *                   example: 10
 *   post:
 *     summary: Increment viewers count
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Updated viewers count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 viewers:
 *                   type: integer
 *                   example: 11
 */
router.get("/viewers", getViewers);

router.post("/viewers", incrementViewers);

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

