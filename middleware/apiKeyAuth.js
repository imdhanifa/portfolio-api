export default function apiKeyAuth(req, res, next) {
  const apiKey = req.headers["x-api-key"]; // header must be x-api-key

  if (!apiKey) {
    return res.status(401).json({ message: "Missing API Key" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "Invalid API Key" });
  }

  next();
}
