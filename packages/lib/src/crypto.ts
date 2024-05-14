import crypto from "crypto";

let secret: string = "";
const hashedSecret: string = crypto.createHash("sha256").update(secret).digest("base64").substr(0, 32);

export type EncryprtedData = {
  iv: string;
  encrypted: string;
};

export const encrypt = <T>(json: T, incommingSecret: string): EncryprtedData => {
  secret = incommingSecret;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", hashedSecret, iv);
  let encrypted = cipher.update(JSON.stringify(json), "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encrypted,
  };
};

export const decrypt = <T>(encryptedData: EncryprtedData, incommingSecret: string): T => {
  secret = incommingSecret;

  if (!incommingSecret) throw new Error("Secret is not set. Set it using `setSecret` method");

  if (incommingSecret !== secret)
    throw new Error("Secret is not valid. Check if it was set using `setSecret` method");

  const iv = Buffer.from(encryptedData.iv, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", hashedSecret, iv);
  let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
};
