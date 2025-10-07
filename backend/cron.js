import cron from "node-cron";
import { pool } from "./db.js";
import { sendMail } from "./routes/contact.js";

// Cron job: runs every 5 minutes
cron.schedule("59 23 * * *", async () => {
  console.log("[CRON] Checking for undelivered mails...");
  try {
    const { rows } = await pool.query(
      "SELECT * FROM contact WHERE mail_delivered = false"
    );
    for (const contact of rows) {
      // Try to resend mail
      await sendMail(contact);
    }
  } catch (err) {
    console.error("[CRON] Error:", err);
  }
});
