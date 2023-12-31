import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_EXPIRES_IN } from '../constants';
import { JWT_SECRET } from '../config';

interface JWT {
  sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: jwt.Secret,
    options?: SignOptions,
  ): string;
}

export function generateJWT(userId: string, email: string): string {
  const options: SignOptions = {
    encoding: 'utf8',
    algorithm: 'HS256',
    expiresIn: JWT_EXPIRES_IN,
  };
  const jwtInstance = jwt as JWT;
  const token = jwtInstance.sign({ userId, email }, JWT_SECRET, options);
  return token;
}
