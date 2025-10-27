/*
  Warnings:

  - Changed the type of `type` on the `Otp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OtpType" AS ENUM ('OTP', 'RESET_LINK');

-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "type",
ADD COLUMN     "type" "OtpType" NOT NULL;

-- DropEnum
DROP TYPE "public"."OptType";
