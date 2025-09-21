import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import connectDB from "./config/mongodb.js";
import portfolioRoutes from "./routes/portfolio.route.js";
import mailRoutes from "./routes/mail.routes.js";
import apiKeyAuth from "./middleware/apiKeyAuth.js";

dotenv.config();
const app = express();

// ✅ CORS Setup
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4200", "https://imdhanifa.github.io"], // React / Angular frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: "10mb" }));  // increase JSON limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/portfolio", apiKeyAuth, portfolioRoutes);
app.use("/api/mail", apiKeyAuth, mailRoutes);

// Connect DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📑 Swagger Docs: http://localhost:${PORT}/api-docs`);
  });
});
