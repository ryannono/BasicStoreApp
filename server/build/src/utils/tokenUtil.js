"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generate an access token for a given user. The token will contain the user's ID,
 * username, email, and names.
 *
 * @param {User} user - The user object which should include id, username, email, firstName, lastName.
 *
 * @returns {string} The generated JSON Web Token (JWT).
 *
 * @throws {Error} If any error occurs during the token generation.
 */
function generateAccessToken({ id, email, firstName, lastName }) {
    return jsonwebtoken_1.default.sign({ id, email, firstName, lastName }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20m',
    });
}
exports.generateAccessToken = generateAccessToken;
/**
 * Generate a refresh token for a given user. The token will contain the user's ID,
 * username, email, and names.
 *
 * @param {User} user - The user object which should include id, username, email, firstName, lastName.
 *
 * @returns {string} The generated JSON Web Token (JWT).
 *
 * @throws {Error} If any error occurs during the token generation.
 */
function generateRefreshToken({ id, email, firstName, lastName }) {
    return jsonwebtoken_1.default.sign({ id, email, firstName, lastName }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '14d',
    });
}
exports.generateRefreshToken = generateRefreshToken;
/**
 * Asynchronous function to verify a given JSON Web Token (JWT).
 *
 * This function will use JWT's verify method to validate the token
 * against the refresh token secret defined in the environment variables.
 *
 * @param token - The JWT that needs to be verified.
 *
 * @returns A Promise that either:
 *   1. Resolves with the user payload data (of type TokenUserPayload),
 *      which includes properties such as the user ID, username, email,
 *      first name and last name, if the token is valid.
 *   2. Resolves with null, indicating that the token is invalid or
 *      has been tampered with.
 */
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, tokenUserPayloadAndJwt) => {
            if (err) {
                resolve(null);
            }
            else {
                const { iat, exp, ...tokenUserPayload } = tokenUserPayloadAndJwt;
                resolve(tokenUserPayload);
            }
        });
    });
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=tokenUtil.js.map