import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// 🔹 Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API",
      version: "1.0.0",
      description: "API for managing personal portfolio (Node + MongoDB) with API Key auth",
    },
    servers: [
      { url: "https://portfolio-api-w6sj.onrender.com" },
      { url: "http://localhost:" + (process.env.PORT || 5000) }
    ],
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

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
