"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.logoutUser = exports.refreshUser = exports.loginUser = exports.registerUser = void 0;
const app_1 = require("../app");
const stripeService_1 = require("../services/stripeService");
const utils_1 = require("../utils");
/**
 * Asynchronous function to register a new user.
 *
 * This function takes in request data, checks if a user with the provided
 * email already exists, hashes the password, creates a new Stripe customer
 * ID, and creates a new user in the database. Upon successful creation of
 * the user, the user is authenticated and tokens are set in the HTTP-only
 * cookies on the response. An existing cart is also associated with the
 * user in the process of user creation.
 *
 * @param req - The Express.js request object. The request body should contain
 *              user data including email and password.
 * @param res - The Express.js response object for sending responses to the client.
 * @param next - The next middleware function.
 *
 * @returns The response object with the user data in JSON format,
 *          and the access and refresh tokens set as HTTP-only cookies.
 * @throws An error if there was an issue creating the user,
 *         generating the tokens, or setting the cookies.
 */
async function registerUser(req, res, next) {
    try {
        const { password, ...otherData } = req.body;
        // check existing user
        const existingUser = await app_1.prisma.user.findUnique({
            where: { email: otherData.email },
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: 'A user with this email already exists' });
        }
        // Hash the plain text password
        const passwordHash = await (0, utils_1.hashPassword)(password);
        // Create a new Stripe customer entiry for the user
        const stripeCustomerId = await (0, stripeService_1.getStripeCustomerId)(otherData);
        // create user
        const createdUser = await app_1.prisma.user.create({
            data: {
                password: passwordHash,
                stripeCustomerId,
                ...otherData,
                cart: { create: {} },
            },
        });
        // respond with accesstoken and refreshtoken in http only cookie
        // also send user info
        return (0, utils_1.handleAuthentication)(createdUser, res, true);
    }
    catch (err) {
        return next(err);
    }
}
exports.registerUser = registerUser;
/**
 * Asynchronous function to log in a user.
 *
 * This function takes in request data, verifies if the user exists,
 * checks the password and then authenticates the user. The process of
 * authentication includes generating tokens and setting them in the
 * HTTP-only cookies on the response.
 *
 * @param req - The Express.js request object. The request body should
 *              contain the email and password of the user.
 * @param res - The Express.js response object for sending responses to the client.
 * @param next - The next middleware function.
 *
 * @returns The response object with the user data in JSON format, and the
 *          access and refresh tokens set as HTTP-only cookies.
 * @throws An error if there was an issue identifying the user, verifying the
 *         password, or during the authentication process.
 */
async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        // identify the user
        const user = await app_1.prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(401).json({ error: 'Invalid email' });
        // verify the password
        const validPassword = await (0, utils_1.verifyPassword)(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // respond with accesstoken and refreshtoken in http only cookie
        // also send user info
        return (0, utils_1.handleAuthentication)(user, res, true);
    }
    catch (err) {
        return next(err);
    }
}
exports.loginUser = loginUser;
/**
 * Asynchronous function to refresh the access token for a user.
 *
 * This function retrieves the refresh token from the incoming request's cookies,
 * verifies its existence in the database, and checks if the decoded user data
 * matches the user data associated with the token in the database. If all checks
 * pass, it authenticates the user by sending a new access token in an HTTP-only
 * cookie.
 *
 * If the refresh token is missing, or if it's not verified or doesn't exist in
 * the database, a JSON response with an error message is sent and the middleware
 * chain is interrupted.
 *
 * This function should be used in routes where token refreshing is required.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during token verification or
 *                 user authentication.
 *
 * @returns {Response} This function returns the response object with a new access
 *                     token in an HTTP-only cookie.
 */
async function refreshUser(req, res, next) {
    try {
        // Get refresh token from the request cookies
        const refreshToken = req.cookies.refreshToken;
        // If no refresh token, return an error response
        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token is missing' });
        }
        // Check if the provided refresh token exists in the database
        const tokenInDb = await app_1.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { tokenUser: true },
        });
        // If the token does not exist in the DB, return an error response
        if (!tokenInDb) {
            return res.status(403).json({
                error: "The used token's access was either revoked or never existed",
            });
        }
        // Verify the refresh token and extract user data
        const userData = await (0, utils_1.verifyToken)(refreshToken, 'refresh');
        // If user data does not match with the one in the DB, return an error response
        if (!userData || userData.id !== tokenInDb.tokenUser.id) {
            return res.status(403).json({
                error: 'Refresh token is invalid',
            });
        }
        // respond with accesstoken in http only cookie
        // also send user info
        return (0, utils_1.handleAuthentication)(tokenInDb.tokenUser, res);
    }
    catch (err) {
        return next(err);
    }
}
exports.refreshUser = refreshUser;
/**
 * Asynchronous function to log out a user.
 *
 * This function will delete the refresh token from the database
 * and clear the access token and refresh token cookies.
 *
 * @param req - The Express.js request object. The request body
 * should contain the refresh token.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns A success message in JSON format.
 * @throws An error if there was an issue logging out the user.
 */
async function logoutUser(req, res, next) {
    try {
        // Get refresh token from the request cookies
        const refreshToken = req.cookies.refreshToken;
        const userData = await (0, utils_1.verifyToken)(refreshToken, 'refresh');
        if (!userData) {
            return res.status(403).json({ error: 'Refresh token is invalid' });
        }
        // Remove token from database
        await app_1.prisma.user.update({
            where: { id: userData.id },
            data: {
                refreshTokens: {
                    delete: {
                        token: refreshToken,
                    },
                },
            },
        });
        // Clear the access and refresh token cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        // Send response
        res.status(200).json({ message: 'User logged out successfully' });
    }
    catch (err) {
        return next(err);
    }
}
exports.logoutUser = logoutUser;
/**
 * Asynchronous function to reset a user's password.
 *
 * This function will check if the user exists, and if it does,
 * hashes the new password and updates it in the database.
 * It will then clear the access token and refresh token cookies.
 *
 * @param req - The Express.js request object. The request body
 * should contain the email and the new password.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns A success message in JSON format.
 * @throws An error if there was an issue resetting the password.
 */
async function resetPassword(req, res, next) {
    try {
        // get email and new password
        const { email, password } = req.body;
        // identify the user
        const user = await app_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // hash the new password
        const passwordHash = await (0, utils_1.hashPassword)(password);
        // update the user's password in the database
        await app_1.prisma.user.update({
            where: { email },
            data: { password: passwordHash },
        });
        // Clear the access and refresh token cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        // Send response
        return res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (err) {
        return next(err);
    }
}
exports.resetPassword = resetPassword;
//# sourceMappingURL=authController.js.map