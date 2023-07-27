import { NextFunction, Request, Response } from 'express';
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
export declare function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void;
