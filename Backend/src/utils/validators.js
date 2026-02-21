export function isValidEmail(email) {
  if (!email) return false;
  // simple RFC-like check
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(String(email).toLowerCase());
}

export function isStrongPassword(pw) {
  if (!pw || pw.length < 8) return false;
  // at least one letter and one number
  const re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return re.test(pw);
}
