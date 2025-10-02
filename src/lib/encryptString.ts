import sodium from "libsodium-wrappers";

//***
// @param input <string>
// @return <Promise<string>
export async function encryptString(input: string) {
  await sodium.ready;
  const secret = process.env.APP_SECRET;
  if (!secret) throw new Error("APP_SECRET not set");
  const key = sodium.crypto_generichash(
    sodium.crypto_secretbox_KEYBYTES,
    sodium.from_string(secret),
  );
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const message = sodium.from_string(input);
  const ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);
  const combined = new Uint8Array(nonce.length + ciphertext.length);
  combined.set(nonce);
  combined.set(ciphertext, nonce.length);
  return sodium.to_base64(combined);
}
