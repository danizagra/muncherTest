/*
  Warnings:

  - Added the required column `order_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_order_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_id" INTEGER NOT NULL,
ALTER COLUMN "Products" SET NOT NULL,
ALTER COLUMN "Products" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
