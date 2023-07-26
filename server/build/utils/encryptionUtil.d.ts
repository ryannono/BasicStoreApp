/**
 * Encrypt a given password using bcrypt.
 *
 * @param {string} password - The password that needs to be encrypted.
 *
 * @returns {Promise<string>} The hashed version of the password.
 *
 * @throws {Error} If any error occurs during the encryption process.
 */
export declare function hashPassword(password: string): Promise<string>;
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
export declare function verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
