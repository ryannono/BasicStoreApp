import bcrypt from 'bcrypt';

/**
 * Encrypt a given password using bcrypt.
 *
 * @param {string} password - The password that needs to be encrypted.
 *
 * @returns {Promise<string>} The hashed version of the password.
 *
 * @throws {Error} If any error occurs during the encryption process.
 */
export async function hashPassword(password: string) {
  const encryptionSalt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, encryptionSalt);
}

/**
 * Verify if a given password matches a provided hashed password.
 *
 * @param {string} password - The plaintext password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 *
 * @returns {Promise<boolean>} True if the passwords match, otherwise false.
 *
 * @throws {Error} If any error occurs during the verification process.
 */
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
