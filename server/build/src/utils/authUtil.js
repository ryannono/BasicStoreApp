"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuthentication = void 0;
const constants_1 = require("./constants");
const tokenUtil_1 = require("./tokenUtil");
/**
 * Asynchronous function to handle the authentication of a user.
 *
 * This function generates an access token for a given user,
 * sets the token as an HTTP-only cookie on the response,
 * and sends a response back to the client with the user data.
 * If the `withRefreshToken` parameter is true, a refresh token
 * is also generated and set as an HTTP-only cookie.
 *
 * @param user - The User object representing the user to authenticate.
 * @param res - The Express.js response object for sending responses to the client.
 * @param withRefreshToken - Boolean value indicating whether to generate
 *                           and set a refresh token as an HTTP-only cookie.
 *
 * @returns The Express.js response object with the user data in JSON format,
 *          and the access (and optionally refresh) token(s) set as HTTP-only cookies.
 *
 * @throws An error if there was an issue generating the tokens or setting the cookies.
 */
async function handleAuthentication(user, res, withRefreshToken) {
    // send tokens as cookies
    const accessToken = (0, tokenUtil_1.generateAccessToken)(user);
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 20 * constants_1.MINUTE,
    });
    if (withRefreshToken) {
        const refreshToken = (0, tokenUtil_1.generateRefreshToken)(user);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: constants_1.DAY });
    }
    // send user in response body
    return res.status(200).json(user);
}
exports.handleAuthentication = handleAuthentication;
//# sourceMappingURL=authUtil.js.map