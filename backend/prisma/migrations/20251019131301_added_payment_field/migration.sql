-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE', 'PAYSTACK');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment" "PaymentMethod" NOT NULL DEFAULT 'PAYSTACK';
