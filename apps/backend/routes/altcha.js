import { createChallenge, verifySolution } from "altcha-lib";
import { ALTCHA_HMAC_KEY } from "../config.js";

export async function challenge(req, res) {
  // Create a new challenge and send it to the client:
  const challenge = await createChallenge({
    hmacKey: ALTCHA_HMAC_KEY,
    maxNumber: 100000, // the maximum random number
  });

  return res.status(200).json(challenge);
}

export function verify(captcha) {
  const ok = verifySolution(captcha, "ALTCHA_HMAC_KEY");

  return ok;
}
