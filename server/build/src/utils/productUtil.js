"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProducts = exports.addProducts = exports.addCategories = void 0;
const app_1 = require("../app");
const promises_1 = __importDefault(require("node:fs/promises"));
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
async function removeProducts() {
    const count = (await app_1.prisma.product.deleteMany()).count;
    console.log(`Deleted ${count} products from the database`);
}
exports.removeProducts = removeProducts;
//# sourceMappingURL=productUtil.js.map