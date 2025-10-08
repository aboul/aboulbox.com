import { body, validationResult } from "express-validator";
import FormData from "form-data";
import Mailgun from "mailgun.js";
import {
  MG_API_KEY,
  MG_DOMAIN,
  MG_FROM_WHO,
  MG_TO_WHO,
  MG_TO_WHO_NAME,
} from "../config.js";
import { pool } from "../db.js";
import { verify } from "./altcha.js";

export const contactValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be under 50 characters")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .escape(),
  body("phone")
    .trim()
    .isMobilePhone()
    .withMessage("Valid phone is required")
    .escape(),
  body("subject")
    .trim()
    .isLength({ max: 128 })
    .withMessage("Subject must be under 128 characters")
    .escape(),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Message must be 10–500 characters long")
    .escape(),
];

export async function contactHandler(req, res) {
  if (!req.body.altcha)
    return res.status(400).json({ error: "Captcha challenge not completed" });

  // Validate captcha
  const ok = verify(req.body.altcha);

  // If captcha is false, return failed challenge
  if (!ok) return res.status(400).json({ error: "Captcha challenge failed" });

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Validation errors : ");
      console.error(errors.array());
      return res.status(400).json({ "validation-error": errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;
    await sendMail({ name, email, phone, subject, message });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function sendMail(contact) {
  let isMailDelivered = false;
  const { name, email, phone, subject, message, id, mail_delivered } = contact;
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: MG_API_KEY,
    url: "https://api.eu.mailgun.net",
  });
  await mg.messages
    .create(MG_DOMAIN, {
      from: name + "<" + MG_FROM_WHO + ">",
      to: [MG_TO_WHO_NAME + "<" + MG_TO_WHO + ">"],
      subject: subject,
      text: email + "\n" + message,
    })
    .then((msg) => {
      isMailDelivered = true;
      console.log(msg);
    })
    .catch((err) => {
      isMailDelivered = false;
      console.error(err);
    });

  if (id) {
    if (mail_delivered !== isMailDelivered)
      // Update existing row
      await pool
        .query("UPDATE contact SET mail_delivered = $1 WHERE id = $2", [
          isMailDelivered,
          id,
        ])
        .then(() => {
          console.log("Message has been sent and saved to database");
          console.log(
            "Request: UPDATE contact SET mail_delivered = $1 WHERE id = $2)",
            [isMailDelivered, id]
          );
        })
        .catch((err) => {
          console.error(err);
        });
  } else {
    // Insert new row
    await pool
      .query(
        "INSERT INTO contact(name, email, phone, subject, message, mail_delivered) VALUES($1, $2, $3, $4, $5, $6)",
        [name, email, phone, subject, message, isMailDelivered]
      )
      .then(() => {
        console.log("Message saved to database");
        console.log(
          "Request: INSERT INTO contact(name, email, phone, subject, message, mail_delivered) VALUES($1, $2, $3, $4, $5, $6)",
          [name, email, phone, subject, message, isMailDelivered]
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
