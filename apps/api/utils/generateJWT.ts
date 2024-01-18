import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_EXPIRES_IN } from '../constants';
import { JWT_SECRET } from '../config';

interface JWT {
  sign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: SignOptions): string;
}

interface JWTArgs {
  payload: {
    userId: string;
    email: string;
  };
  duration?: number;
  durationUnit?: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
}

export function generateJWT({ payload, duration, durationUnit }: JWTArgs): string {
  let options: SignOptions = {};

  if (duration && durationUnit) {
    options.expiresIn = `${duration}${durationUnit}`;
  }

  const jwtInstance = jwt as JWT;

  const token = jwtInstance.sign(payload, JWT_SECRET, options);

  return token;
}
