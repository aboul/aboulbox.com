import cors from "cors";
import { host } from "../config.js";

// Only allow requests from your frontend origin
const allowedOrigin = host;

export const corsOptions = {
  origin: allowedOrigin,
  methods: ["GET", "POST"],
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
