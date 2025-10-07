import dotenv from "dotenv";
dotenv.config();

export const MG_API_KEY = process.env.MAILGUN_APIKEY || "API_KEY";
export const MG_DOMAIN = process.env.MAILGUN_DOMAIN || "DOMAIN";
export const MG_FROM_WHO =
  process.env.MAILGUN_FROM_WHO || "john.doe@example.com";
export const MG_TO_WHO = process.env.MAILGUN_TO_WHO || "jane.doe@example.com";
export const MG_TO_WHO_NAME = process.env.MAILGUN_TO_WHO_NAME || "Jane Doe";

export const POSTGRES_USER = process.env.POSTGRES_USER || "myuser";
export const POSTGRES_HOST = process.env.POSTGRES_HOST || "db";
export const POSTGRES_DB = process.env.POSTGRES_DB || "mydatabase";
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "mypassword";
export const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;

export const port = 3001;
export const host = process.env.SERVER_NAME || "abel-brien.localhost";

export const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY || "";
