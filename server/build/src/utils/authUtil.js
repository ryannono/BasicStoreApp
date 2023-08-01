"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeauthentication = exports.handleAuthentication = void 0;
const constants_1 = require("./constants");
const tokenUtil_1 = require("./tokenUtil");
const app_1 = require("../app");
const userUtil_1 = require("./userUtil");
/**
 * The base options to use when setting a cookie.
 *
 * The options include:
 * - `httpOnly`: A boolean indicating whether the cookie is HttpOnly. It's set to `true` by default, meaning the cookie can't be accessed via JavaScript. This mitigates the risk of client side script accessing the protected cookie.
 *
 * Depending on the environment (development or production), the options also include:
 * - In a development environment (`process.env.NODE_ENV !== 'production'`):
 *   - `sameSite`: This attribute can be set to `'lax'` to prevent the browser from sending this cookie along with cross-site requests. This provides some protection against cross-site request forgery attacks (CSRF).
 *   - `secure`: This attribute is set to `false` which means the cookie will be sent with every request, even if it's not on a secure (https) connection.
 * - In a production environment:
 *   - `sameSite`: This attribute is set to `'none'` to allow the browser to send this cookie along with cross-site requests.
 *   - `secure`: This attribute is set to `true` to ensure the cookie will only be sent with requests over secure (https) connections.
 */
const baseCookieOptions = {
    httpOnly: true,
    ...(process.env.NODE_ENV !== 'production'
        ? { sameSite: 'lax', secure: false }
        : { sameSite: 'none', secure: true }),
};
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
        ...baseCookieOptions,
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
            ...baseCookieOptions,
            maxAge: 14 * constants_1.DAY,
        });
    }
    // send user in response body
    return res.json((0, tokenUtil_1.isTokenUserPayload)(user) ? user : (0, userUtil_1.getEssentialUserProps)(user));
}
exports.handleAuthentication = handleAuthentication;
/**
 * Function to handle user deauthentication. It clears the access and refresh token cookies.
 *
 * @param {Response} res - The response object from Express.js.
 *
 * @returns {Response} - The response object with the cleared cookies and a success message.
 */
function handleDeauthentication(res) {
    // Clear the access and refresh token cookies
    res.clearCookie('accessToken', baseCookieOptions);
    res.clearCookie('refreshToken', baseCookieOptions);
    // Send response
    return res.status(200).json({ message: 'User logged out successfully' });
}
exports.handleDeauthentication = handleDeauthentication;
//# sourceMappingURL=authUtil.js.map