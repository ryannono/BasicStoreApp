"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProducts = exports.addProducts = exports.addCategories = void 0;
const app_1 = require("../app");
const promises_1 = __importDefault(require("node:fs/promises"));
/**
 * Asynchronously reads a JSON file containing product categories, parses it, and then
 * adds these categories to the database using Prisma's `createMany` function.
 * Logs the number of categories added to the console. Disconnects the Prisma client
 * upon completion and handles any potential errors by logging them to the console.
 * @returns {Promise<void>}
 */
async function addCategories() {
    try {
        // Read the JSON file
        const data = await promises_1.default.readFile('/Users/ryannono/Documents/GitHub/TasteTrove-App/products/categories.json', 'utf-8');
        // Parse the JSON file to get the categories
        const categories = JSON.parse(data);
        // Add the categories to the database
        const createManyResponse = await app_1.prisma.productCategory.createMany({
            data: categories,
        });
        console.log(`Added ${createManyResponse.count} categories to the database.`);
    }
    catch (error) {
        console.error('Error adding categories to the database:', error);
    }
    finally {
        // Close the database connections
        await app_1.prisma.$disconnect();
    }
}
exports.addCategories = addCategories;
/**
 * Asynchronously reads a JSON file containing product data, parses it, and then
 * for each product in the file, creates a new product entry in the database,
 * associating any related images as well. Logs the ID of each product added to the console.
 * @returns {Promise<void>}
 */
async function addProducts() {
    const data = await promises_1.default.readFile('/Users/ryannono/Documents/GitHub/TasteTrove-App/products/products.json', 'utf8');
    const products = JSON.parse(data);
    for (const product of products) {
        const { images, ...productData } = product;
        // Creating a product.
        const newProduct = await app_1.prisma.product.create({
            data: {
                images: {
                    createMany: {
                        data: images,
                    },
                },
                ...productData,
            },
            include: {
                images: true,
            },
        });
        console.log(`Added product: ${newProduct.id}`);
    }
}
exports.addProducts = addProducts;
/**
 * Asynchronously removes all product entries from the database using Prisma's `deleteMany` function.
 * Logs the number of deleted products to the console.
 * @returns {Promise<void>}
 */
async function removeProducts() {
    const count = (await app_1.prisma.product.deleteMany()).count;
    console.log(`Deleted ${count} products from the database`);
}
exports.removeProducts = removeProducts;
//# sourceMappingURL=productUtil.js.map