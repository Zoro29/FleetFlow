import { verify } from '../utils/jwt.js';
import { findById } from '../repositories/usersRepository.js';

export async function authGuard(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  const token = auth.slice(7);
  const payload = verify(token);
  if (!payload) return res.status(401).json({ message: 'Invalid token' });
  const user = findById(payload.user_id);
  if (!user) return res.status(401).json({ message: 'User not found' });
  req.user = { id: user.id, role: user.role };
  next();
}
