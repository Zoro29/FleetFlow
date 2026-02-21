import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const EXPIRES = '8h';

export function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
}

export function verify(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
