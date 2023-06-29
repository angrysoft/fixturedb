-- CreateTable
CREATE TABLE "Fixture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "power" INTEGER NOT NULL,
    "fixtureTypeId" INTEGER NOT NULL,
    "manufactureId" INTEGER NOT NULL,
    CONSTRAINT "Fixture_fixtureTypeId_fkey" FOREIGN KEY ("fixtureTypeId") REFERENCES "FixtureType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fixture_manufactureId_fkey" FOREIGN KEY ("manufactureId") REFERENCES "Manufacture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FixtureType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Manufacture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FixtureDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "powerPassage" BOOLEAN NOT NULL,
    "dmxMode" TEXT,
    "dmxChannel" INTEGER,
    "powerPlugId" INTEGER,
    "outdor" BOOLEAN NOT NULL DEFAULT false,
    "desc" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "thickness" INTEGER,
    "resolutionH" INTEGER,
    "resolutionV" INTEGER,
    "pixel" REAL,
    CONSTRAINT "FixtureDetails_powerPlugId_fkey" FOREIGN KEY ("powerPlugId") REFERENCES "PowerPlug" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PowerPlug" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Connector" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DownloadFiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fixtureDetailsId" INTEGER NOT NULL,
    CONSTRAINT "DownloadFiles_fixtureDetailsId_fkey" FOREIGN KEY ("fixtureDetailsId") REFERENCES "FixtureDetails" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FixtureToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FixtureToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Fixture" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FixtureToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ConnectorToFixtureDetails" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ConnectorToFixtureDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "Connector" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ConnectorToFixtureDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "FixtureDetails" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Fixture_model_key" ON "Fixture"("model");

-- CreateIndex
CREATE UNIQUE INDEX "FixtureType_name_key" ON "FixtureType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacture_name_key" ON "Manufacture"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PowerPlug_name_key" ON "PowerPlug"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Connector_name_key" ON "Connector"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadFiles_url_key" ON "DownloadFiles"("url");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadFiles_fixtureDetailsId_key" ON "DownloadFiles"("fixtureDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FixtureToTag_AB_unique" ON "_FixtureToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FixtureToTag_B_index" ON "_FixtureToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConnectorToFixtureDetails_AB_unique" ON "_ConnectorToFixtureDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_ConnectorToFixtureDetails_B_index" ON "_ConnectorToFixtureDetails"("B");
