/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `isCorrect` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `license` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `correct` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correct` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `cnpj` on table `School` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "createdAt",
DROP COLUMN "isCorrect",
DROP COLUMN "updatedAt",
ADD COLUMN     "correct" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Instructor" DROP COLUMN "createdAt",
DROP COLUMN "license",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "alternatives" TEXT[],
ADD COLUMN     "correct" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "city",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "cnpj" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "User";
