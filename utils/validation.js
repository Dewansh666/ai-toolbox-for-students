// src/js/utils/validation.js

// Validate email format using regex
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength (minimum 6 characters)
export function isValidPassword(password) {
  return password.length >= 6;
}

// Check if fields are not empty
export function areFieldsFilled(...fields) {
  return fields.every(field => field.trim() !== "");
}
