import bcrypt from 'bcryptjs';
import { createUser, findByEmail } from '../repositories/usersRepository.js';
import { sign } from '../utils/jwt.js';

export async function register({ name, email, password, role = 'Dispatcher' }) {
  const existing = await findByEmail(email);
  if (existing) throw { status: 400, message: 'Email already exists' };
  const hash = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password_hash: hash, role });
  return { id: user.id, email: user.email };
}

export async function login({ email, password }) {
  const user = await findByEmail(email);
  if (!user) throw { status: 401, message: 'Invalid credentials' };
  const ok = await bcrypt.compare(password, user.password_hash || '');
  if (!ok) throw { status: 401, message: 'Invalid credentials' };
  const token = sign({ user_id: user.id, role: user.role });
  return { token };
}
