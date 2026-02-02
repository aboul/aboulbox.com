import dotenv from "dotenv";
dotenv.config();

export const MG_API_KEY = process.env.MAILGUN_APIKEY;
export const MG_DOMAIN = process.env.MAILGUN_DOMAIN;
export const MG_FROM_WHO =
  process.env.MAILGUN_FROM_WHO;
export const MG_TO_WHO = process.env.MAILGUN_TO_WHO;
export const MG_TO_WHO_NAME = process.env.MAILGUN_TO_WHO_NAME;

export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;

export const port = 3001;
export const host = process.env.SERVER_NAME;

export const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY;
