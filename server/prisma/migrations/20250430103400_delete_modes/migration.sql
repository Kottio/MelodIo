/*
  Warnings:

  - You are about to drop the `Mode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModeNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ModeMoods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModeNote" DROP CONSTRAINT "ModeNote_modeId_fkey";

-- DropForeignKey
ALTER TABLE "_ModeMoods" DROP CONSTRAINT "_ModeMoods_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModeMoods" DROP CONSTRAINT "_ModeMoods_B_fkey";

-- DropTable
DROP TABLE "Mode";

-- DropTable
DROP TABLE "ModeNote";

-- DropTable
DROP TABLE "Mood";

-- DropTable
DROP TABLE "_ModeMoods";
