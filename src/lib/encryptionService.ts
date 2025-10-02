// lib/encryptionService.js
import _sodium from "libsodium-wrappers";
import { logger } from "@/lib/logger";

async function safeSodiumHexConversion(hexString?: string) {
  const log = logger.child({ module: "safeSodiumHexConversion" });
  await _sodium.ready;
  const sodium = _sodium;

  if (!hexString) {
    log.error("No hex string provided");
    return null;
  }

  const cleanHex = hexString.trim().toLowerCase();

  // Detailed validation
  log.debug(`Raw hex string: ${hexString}`);
  log.debug(`Cleaned hex string: ${cleanHex}`);
  log.debug(`Hex string length: ${cleanHex.length}`);

  // Check for valid hex characters and even length
  const hexRegex = /^[0-9a-f]+$/;
  if (!hexRegex.test(cleanHex)) {
    log.error("Invalid hex characters detected");
    return null;
  }

  if (cleanHex.length % 2 !== 0) {
    log.error("Hex string must have an even number of characters", {
      length: cleanHex.length,
    });
    return null;
  }

  try {
    const key = sodium.from_hex(cleanHex);
    log.debug("Successful hex conversion");
    return key;
  } catch (error) {
    log.error(`Hex conversion failed: ${error}`);
    log.error(
      `Error details: ${error?.name}\n
      msg: ${error?.message}\n
      stack: ${error?.stack}`,
    );
    return null;
  }
}

export const encrypt = async (text: string) => {
  const log = logger.child({ module: "encryptionService" });
  await _sodium.ready; // Ensure libsodium is ready
  const sodium = _sodium;

  const secret = process.env.APP_SECRET;
  log.debug(`APP_SECRET: ${secret}`);
  if (secret === undefined) {
    log.error("APP_SECRET not set");
  }
  // const key = sodium.from_hex(
  //   (process.env?.APP_SECRET || "").trim().toLowerCase(),
  // ); // Convert hex secret to bytes
  const key = await safeSodiumHexConversion(secret);
  log.debug(`nonce-bytes: ${sodium.crypto_secretbox_NONCEBYTES}`);
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES); // Generate a random nonce
  log.debug(`nonce: ${nonce}`);
  log.debug(`nonce-length: ${nonce.length}`);
  const message = sodium.from_string(text); // Convert text to bytes

  const cipherText = sodium.crypto_secretbox_easy(message, nonce, key); // Encrypt the message
  log.debug(`cipherText: ${cipherText}`);
  const encryptedMessage = `${sodium.to_base64(nonce, sodium.base64_variants.URLSAFE_NO_PADDING)}:${sodium.to_base64(cipherText, sodium.base64_variants.URLSAFE_NO_PADDING)}`; // Combine nonce and cipherText with a colon

  log.debug(`encryptedMessage: ${encryptedMessage}`);
  return encryptedMessage; // Return the encrypted message
};
