import { JWT_SECRET } from "@keyguard/database";
import jwt, { SignOptions } from "jsonwebtoken";

interface JWT {
  // eslint-disable-next-line no-unused-vars
  sign: (payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: SignOptions) => string;
}

interface JWTArgs {
  payload: {
    userId: string;
    email: string;
  };
  duration?: number;
  durationUnit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years";
}

export function generateJWT({ payload, duration, durationUnit }: JWTArgs): string {
  const options: SignOptions = {};

  if (duration && durationUnit) {
    options.expiresIn = `${duration}${durationUnit}`;
  }

  const jwtInstance = jwt as JWT;

  const token = jwtInstance.sign(payload, JWT_SECRET, options);

  return token;
}
