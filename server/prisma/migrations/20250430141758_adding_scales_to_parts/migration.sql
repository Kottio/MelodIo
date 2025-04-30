-- AlterTable
ALTER TABLE "Parts" ADD COLUMN     "scales" TEXT[] DEFAULT ARRAY[]::TEXT[];
