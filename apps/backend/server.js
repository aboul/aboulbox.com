import express from "express";
import bodyParser from "body-parser";
import { port } from "./config.js";
import { corsMiddleware } from "./middleware/cors.js";
import { limiter } from "./middleware/rateLimiter.js";
import { contactValidation, contactHandler } from "./routes/contact.js";
import { challenge } from "./routes/altcha.js";

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(limiter);
app.get("/api/altcha", challenge);
app.post("/api/contact", contactValidation, contactHandler);
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

// Auto-wire cron job
import "./cron.js";
