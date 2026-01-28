import jwt, { Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as Secret;
if (!JWT_SECRET) {
  throw new Error('JWT secret missing.');
}

export function verifyJWT( password : string) {
  try {
    return jwt.verify(password, JWT_SECRET);
  }  catch (error) {
    throw new Error('Invalid or expired token.');
  }
}

