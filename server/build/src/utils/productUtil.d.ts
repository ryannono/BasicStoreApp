/**
 * Asynchronously reads a JSON file containing product categories, parses it, and then
 * adds these categories to the database using Prisma's `createMany` function.
 * Logs the number of categories added to the console. Disconnects the Prisma client
 * upon completion and handles any potential errors by logging them to the console.
 * @returns {Promise<void>}
 */
export declare function addCategories(): Promise<void>;
/**
 * Asynchronously reads a JSON file containing product data, parses it, and then
 * for each product in the file, creates a new product entry in the database,
 * associating any related images as well. Logs the ID of each product added to the console.
 * @returns {Promise<void>}
 */
export declare function addProducts(): Promise<void>;
/**
 * Asynchronously removes all product entries from the database using Prisma's `deleteMany` function.
 * Logs the number of deleted products to the console.
 * @returns {Promise<void>}
 */
export declare function removeProducts(): Promise<void>;
