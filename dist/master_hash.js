import crypto from "./crypto";
import { HASH_LENGTH, ITERATIONS } from "./constants";
export const getMasterHash = async (master_key, password) => {
    const salt = Buffer.from(password);
    const key = await crypto.subtle.importKey("raw", // only raw format
    Buffer.from(master_key), // BufferSource
    "PBKDF2", false, // only false
    ["deriveBits", "deriveKey"]);
    const derivedBits = await crypto.subtle.deriveBits({
        name: "PBKDF2",
        salt,
        iterations: ITERATIONS,
        hash: "SHA-256",
    }, key, HASH_LENGTH);
    return Buffer.from(derivedBits).toString("base64");
};
//# sourceMappingURL=master_hash.js.map