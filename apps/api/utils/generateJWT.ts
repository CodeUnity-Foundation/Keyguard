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
  secret: string;
  duration: string;
}

export function generateJWT({ payload, duration, secret }: JWTArgs): string {
  const options: SignOptions = {
    expiresIn: duration,
  };

  const jwtInstance = jwt as JWT;

  const token = jwtInstance.sign(payload, secret, options);

  return token;
}
