/*
  Warnings:

  - The values [ordered] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('paymentInitiated', 'paymentSucceeded', 'shipped', 'delivered');
ALTER TABLE "Order" ALTER COLUMN "OrderStatus" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "OrderStatus" TYPE "OrderStatus_new" USING ("OrderStatus"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "OrderStatus" SET DEFAULT 'paymentInitiated';
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "OrderStatus" SET DEFAULT 'paymentInitiated';
