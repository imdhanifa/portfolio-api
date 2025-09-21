import Portfolio from "../models/portfolio.model.js";

export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPortfolio = async (req, res) => {
  try {
    await Portfolio.deleteMany({});
    const newPortfolio = new Portfolio(req.body);
    const saved = await newPortfolio.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePortfolio = async (req, res) => {
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
};

export const deletePortfolio = async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Viewers
export const getViewers = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json({ viewers: portfolio.viewers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incrementViewers = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      {},
      { $inc: { viewers: 1 } },
      { new: true }
    );
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json({ viewers: portfolio.viewers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Likes
export const getLikes = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json({ likes: portfolio.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incrementLikes = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      {},
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json({ likes: portfolio.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
