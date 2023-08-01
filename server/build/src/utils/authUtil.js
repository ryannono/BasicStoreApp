"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuthentication = void 0;
const constants_1 = require("./constants");
const tokenUtil_1 = require("./tokenUtil");
const app_1 = require("../app");
const userUtil_1 = require("./userUtil");
/**
 * Asynchronous function to handle user authentication.
 *
 * This function generates and sends an access token (and optionally a refresh token)
 * as HTTP-only cookies. The access token has a lifespan of 20 minutes, while the
 * refresh token (if generated) lasts for 14 days.
 *
 * If the `withRefreshToken` parameter is true, the function will store the refresh
 * token in the database along with the expiry date and the user's ID.
 *
 * It also sends a JSON response containing the authenticated user's ID, email,
 * first name, and last name.
 *
 * @param user - The user to authenticate.
 * @param res - Express.js response object for sending responses to the client.
 * @param withRefreshToken - Boolean flag indicating whether to generate and send a
 * refresh token along with the access token. Optional and defaults to false.
 *
 * @returns {Promise<Response>} Promise object represents the HTTP response.
 */
async function handleAuthentication(user, res, withRefreshToken) {
    // send tokens as cookies
    const accessToken = (0, tokenUtil_1.generateAccessToken)(user);
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV !== 'production' ? 'lax' : 'none',
        maxAge: 20 * constants_1.MINUTE,
    });
    if (withRefreshToken) {
        const refreshToken = (0, tokenUtil_1.generateRefreshToken)(user);
        await app_1.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                expiresAt: new Date(Date.now() + 14 * constants_1.DAY),
                tokenUser: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV !== 'production' ? 'lax' : 'none',
            maxAge: 14 * constants_1.DAY,
        });
    }
    // send user in response body
    return res.json((0, tokenUtil_1.isTokenUserPayload)(user) ? user : (0, userUtil_1.getEssentialUserProps)(user));
}
exports.handleAuthentication = handleAuthentication;
//# sourceMappingURL=authUtil.js.map