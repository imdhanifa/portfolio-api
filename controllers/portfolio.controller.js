import Portfolio from "../models/portfolio.model.js";

// Get client IP helper
const getClientIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip
  );
};

// Ensure portfolio doc exists (singleton pattern)
const getPortfolioDoc = async () => {
  let portfolio = await Portfolio.findOne();
  if (!portfolio) {
    portfolio = new Portfolio();
    await portfolio.save();
  }
  return portfolio;
};

// Get views
export const getViews = async (req, res) => {
  const portfolio = await getPortfolioDoc();
  res.json({ views: portfolio.views });
};

// Increment views
export const incrementViews = async (req, res) => {
  const clientIp = getClientIp(req);
  const portfolio = await getPortfolioDoc();

  if (!portfolio.viewedClients.includes(clientIp)) {
    portfolio.views += 1;
    portfolio.viewedClients.push(clientIp);
    await portfolio.save();
    return res.json({ views: portfolio.views, alreadyViewed: false, clientIp });
  }

  res.json({ views: portfolio.views, alreadyViewed: true, clientIp });
};

// Get likes
export const getLikes = async (req, res) => {
  const portfolio = await getPortfolioDoc();
  res.json({ likes: portfolio.likes });
};

// Increment likes
export const incrementLikes = async (req, res) => {
  const clientIp = getClientIp(req);
  const portfolio = await getPortfolioDoc();

  if (!portfolio.likedClients.includes(clientIp)) {
    portfolio.likes += 1;
    portfolio.likedClients.push(clientIp);
    await portfolio.save();
    return res.json({ likes: portfolio.likes, alreadyLiked: false, clientIp });
  }

  res.json({ likes: portfolio.likes, alreadyLiked: true, clientIp });
};
