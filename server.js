import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import portfolioRoute from "./routes/portfolio.route.js";
import apiKeyAuth from "./middleware/apiKeyAuth.js";

dotenv.config();
const app = express();

// ✅ CORS Setup
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4200"], // React / Angular frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: "10mb" }));  // increase JSON limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// 🔹 Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API",
      version: "1.0.0",
      description: "API for managing personal portfolio (Node + MongoDB) with API Key auth",
    },
    servers: [{ url: "http://localhost:" + (process.env.PORT || 5000) }],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
    },
    security: [{ ApiKeyAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Protect Portfolio Routes with API Key
app.use("/api/portfolio", apiKeyAuth, portfolioRoute);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
      console.log(`📑 Swagger Docs: http://localhost:${process.env.PORT || 5000}/api-docs`);
    });
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
