/*
  Warnings:

  - A unique constraint covering the columns `[token,tokenUserId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_tokenUserId_key" ON "RefreshToken"("token", "tokenUserId");
