import express from "express";
import Portfolio from "../models/portfolio.model.js";

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
router.get("/", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
router.post("/", async (req, res) => {
  try {
    await Portfolio.deleteMany({});
    const newPortfolio = new Portfolio(req.body);
    const saved = await newPortfolio.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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
router.put("/:id", async (req, res) => {
  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPortfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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
router.delete("/:id", async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
