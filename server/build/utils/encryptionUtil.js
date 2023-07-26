"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Encrypt a given password using bcrypt.
 *
 * @param {string} password - The password that needs to be encrypted.
 *
 * @returns {Promise<string>} The hashed version of the password.
 *
 * @throws {Error} If any error occurs during the encryption process.
 */
async function hashPassword(password) {
    const encryptionSalt = await bcrypt_1.default.genSalt(10);
    return bcrypt_1.default.hash(password, encryptionSalt);
}
exports.hashPassword = hashPassword;
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
async function verifyPassword(password, hashedPassword) {
    return await bcrypt_1.default.compare(password, hashedPassword);
}
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=encryptionUtil.js.map