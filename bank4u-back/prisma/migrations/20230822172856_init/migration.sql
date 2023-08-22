-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telephone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telephoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "refreshToken" TEXT
);
INSERT INTO "new_User" ("createdAt", "id", "name", "password", "refreshToken", "telephone", "telephoneVerified", "updatedAt") SELECT "createdAt", "id", "name", "password", "refreshToken", "telephone", "telephoneVerified", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_telephone_key" ON "User"("telephone");
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
