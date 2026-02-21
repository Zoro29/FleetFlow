import * as authService from '../services/authService.js';
import { isValidEmail, isStrongPassword } from '../utils/validators.js';

export async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ message: 'name,email,password required' });
    if (!isValidEmail(email)) return res.status(400).json({ message: 'invalid email' });
    if (!isStrongPassword(password)) return res.status(400).json({ message: 'password too weak (min 8 chars, include letters and numbers)' });
    const result = await authService.register({ name, email, password, role });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function checkEmail(req, res, next) {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ message: 'email required' });
    const result = await authService.checkEmail(email);
    res.json({ registered: result });
  } catch (err) {
    next(err);
  }
}
