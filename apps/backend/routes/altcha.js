import { createChallenge, randomInt, verifySolution } from "altcha-lib";
import { deriveKey } from "altcha-lib/algorithms/pbkdf2";
import { ALTCHA_HMAC_KEY } from "../config.js";

export async function challenge(req, res) {
  // Create a new challenge and send it to the client:
  const challenge = await createChallenge({
    algorithm: "PBKDF2/SHA-256",
    cost: 2000,
    counter: randomInt(5_000, 10_000),
    deriveKey,
    hmacSignatureSecret: ALTCHA_HMAC_KEY,
    hmacKeySignatureSecret: ALTCHA_HMAC_KEY,
  });

  return res.status(200).json(challenge);
}

export function verify(payload) {
  const result = verifySolution({
    challenge: payload.challenge,
    solution: payload.solution,
  });

  if (result.verified) {
    return true;
  }
  return false;
}
