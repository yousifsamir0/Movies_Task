/*
  Warnings:

  - You are about to drop the column `image` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imdbID]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Poster` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Year` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imdbID` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Movie_movieId_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "image",
DROP COLUMN "movieId",
DROP COLUMN "title",
DROP COLUMN "year",
ADD COLUMN     "Poster" TEXT NOT NULL,
ADD COLUMN     "Title" TEXT NOT NULL,
ADD COLUMN     "Year" INTEGER NOT NULL,
ADD COLUMN     "imdbID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imdbID_key" ON "Movie"("imdbID");
