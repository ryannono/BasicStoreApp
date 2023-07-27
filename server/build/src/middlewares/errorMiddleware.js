"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
/**
 * Type guard function to determine if an unknown object is an instance of Error.
 *
 * @param {unknown} unknownCatch - The unknown object to be checked.
 *
 * @returns {boolean} Returns true if the object is an instance of Error; otherwise false.
 */
function isError(unknownCatch) {
    return unknownCatch instanceof Error;
}
/**
 * Error handling middleware for Express application.
 * Responds with the error message if it's known, or a default message for unknown errors.
 *
 * @param {unknown} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {void} Nothing.
 */
function errorHandler(err, req, res, next) {
    // if response headers are already sent
    // no need to attempt to send a response
    // just ppass the error to the next middleware
    // so that it is aware an error occred and may affect it's run/output
    if (res.headersSent)
        return next(err);
    res
        .status(500)
        .json({ error: isError(err) ? err.message : 'An unknown error occurred.' });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map