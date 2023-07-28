// eslint-disable-next-line node/no-extraneous-import
import {Product} from '@prisma/client';
import {prisma} from '../app';
import fs from 'node:fs/promises';

export async function addCategories() {
  try {
    // Read the JSON file
    const data = await fs.readFile(
      '/Users/ryannono/Documents/GitHub/TasteTrove-App/products/categories.json',
      'utf-8'
    );

    // Parse the JSON file to get the categories
    const categories = JSON.parse(data);

    // Add the categories to the database
    const createManyResponse = await prisma.productCategory.createMany({
      data: categories,
    });

    console.log(
      `Added ${createManyResponse.count} categories to the database.`
    );
  } catch (error) {
    console.error('Error adding categories to the database:', error);
  } finally {
    // Close the database connections
    await prisma.$disconnect();
  }
}

export async function addProducts() {
  const data = await fs.readFile(
    '/Users/ryannono/Documents/GitHub/TasteTrove-App/products/products.json',
    'utf8'
  );
  const products = JSON.parse(data);

  for (const product of products) {
    const {images, ...productData} = product;

    // Creating a product.
    const newProduct = await prisma.product.create({
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

export async function removeProducts() {
  const count = (await prisma.product.deleteMany()).count;
  console.log(`Deleted ${count} products from the database`);
}
