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
function generateAccessToken({ id, username, email, firstName, lastName, }) {
    return jsonwebtoken_1.default.sign({ id, username, email, firstName, lastName }, process.env.ACCESS_TOKEN_SECRET, {
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
function generateRefreshToken({ id, username, email, firstName, lastName, }) {
    return jsonwebtoken_1.default.sign({ id, username, email, firstName, lastName }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '14d',
    });
}
exports.generateRefreshToken = generateRefreshToken;
/**
 * Verify a given JSON Web Token (JWT). If the token is valid, the function will return
 * the user data embedded in the token.
 *
 * @param {string} token - The JWT to be verified.
 *
 * @returns {Promise<TokenUserPayload>} A promise that resolves with the user data if the token is valid.
 * @throws {Error} If the token is not valid, the promise is rejected with an error.
 */
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, tokenUserPayloadAndJwt) => {
            if (err) {
                reject(new Error(`error: ${err.message}`));
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