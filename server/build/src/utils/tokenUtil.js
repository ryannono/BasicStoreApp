"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = exports.isTokenUserPayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userUtil_1 = require("./userUtil");
function isTokenUserPayload(user) {
    return user.cartId !== undefined;
}
exports.isTokenUserPayload = isTokenUserPayload;
/**
 * The `generateAccessToken` function creates a new JSON Web Token (JWT)
 * which can be used as an access token for authenticating a user.
 *
 * @param {User} user - The user object from which token payload will be generated.
 *
 * @returns {string} - Returns a JWT as a string.
 *
 * The function uses the 'sign' method from the 'jsonwebtoken' library
 * to create a new token with the user's data (id, email, firstName, lastName)
 * and the secret key from the environment variable 'ACCESS_TOKEN_SECRET'.
 * The token will expire in 20 minutes ('20m').
 */
function generateAccessToken(userData) {
    let data;
    if (isTokenUserPayload(userData)) {
        data = userData;
    }
    else {
        data = (0, userUtil_1.getEssentialUserProps)(userData);
    }
    return jsonwebtoken_1.default.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20m',
    });
}
exports.generateAccessToken = generateAccessToken;
/**
 * The `generateRefreshToken` function creates a new JSON Web Token (JWT)
 * which can be used as a refresh token for refreshing the user's access token.
 *
 * @param {User} user - The user object from which token payload will be generated.
 *
 * @returns {string} - Returns a JWT as a string.
 *
 * This function uses the 'sign' method from the 'jsonwebtoken' library
 * to create a new token with the user's data (id, email, firstName, lastName)
 * and the secret key from the environment variable 'REFRESH_TOKEN_SECRET'.
 * The token will expire in 14 days ('14d').
 */
function generateRefreshToken(userData) {
    let data;
    if (isTokenUserPayload(userData)) {
        data = userData;
    }
    else {
        data = (0, userUtil_1.getEssentialUserProps)(userData);
    }
    return jsonwebtoken_1.default.sign(data, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '14d',
    });
}
exports.generateRefreshToken = generateRefreshToken;
/**
 * Asynchronous function to verify a given JSON Web Token (JWT).
 *
 * This function will use JWT's verify method to validate the token
 * against either the access token secret or refresh token secret,
 * depending on the `tokenType` parameter, defined in the environment variables.
 *
 * @param token - The JWT that needs to be verified.
 * @param tokenType - The type of token to verify, either 'access' or 'refresh'.
 *
 * @returns A Promise that either:
 *   1. Resolves with the user payload data (of type TokenUserPayload),
 *      which includes properties such as the user ID, email, first name,
 *      and last name, if the token is valid.
 *   2. Resolves with null, indicating that the token is invalid or
 *      has been tampered with.
 */
function verifyToken(token, tokenType) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, (tokenType === 'access'
            ? process.env.ACCESS_TOKEN_SECRET
            : process.env.REFRESH_TOKEN_SECRET), (err, tokenUserPayloadAndJwt) => {
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