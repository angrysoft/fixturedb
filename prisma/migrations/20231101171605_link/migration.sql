/*
  Warnings:

  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Links";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fixtureDetailsId" INTEGER NOT NULL,
    CONSTRAINT "Link_fixtureDetailsId_fkey" FOREIGN KEY ("fixtureDetailsId") REFERENCES "FixtureDetails" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Link_fixtureDetailsId_key" ON "Link"("fixtureDetailsId");
