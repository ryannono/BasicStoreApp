"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.authenticateAccessToken = void 0;
const tokenUtil_1 = require("../utils/tokenUtil");
/**
 * Asynchronous middleware function to authenticate access based on a valid access token.
 *
 * This function retrieves the access token from the incoming request's cookies,
 * verifies the token, and checks whether the user is authenticated.
 * If the access token is missing, or if it's not verified, a JSON response with an
 * error message is sent and the middleware chain is interrupted. If the token is
 * valid, the user information extracted from the token is added to the res local variables,
 * and the next middleware function in the chain is invoked.
 *
 * This function should be used in routes where authenticated access is required.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during token verification.
 *
 * @returns {void} This function does not have a return value.
 */
async function authenticateAccessToken(req, res, next) {
    try {
        // get accessToken from request
        const accessToken = req.cookies.accessToken;
        const noAccess = () => {
            return res.status(401).json({ error: 'User does not have access' });
        };
        // check token exists
        console.log('accessToken');
        if (!accessToken)
            return noAccess();
        // verify token
        const verifiedUser = await (0, tokenUtil_1.verifyToken)(accessToken, 'access');
        if (!verifiedUser)
            return noAccess();
        // pass user information to next middleware
        res.locals.user = verifiedUser;
        // next function
        return next();
    }
    catch (err) {
        return next(err);
    }
}
exports.authenticateAccessToken = authenticateAccessToken;
function verifyAdmin(req, res, next) {
    const user = res.locals.user;
    if (!user)
        return next(new Error('Authenticate access token first'));
    if (user.role !== 'ADMIN') {
        return res.status(401).json({ error: 'Access denied' });
    }
    return next();
}
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=authMiddleware.js.map