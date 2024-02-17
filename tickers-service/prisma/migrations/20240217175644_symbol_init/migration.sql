/*
  Warnings:

  - You are about to drop the column `symbol` on the `Tickers` table. All the data in the column will be lost.
  - You are about to drop the column `symbolName` on the `Tickers` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `TickersHistory` table. All the data in the column will be lost.
  - You are about to drop the column `symbolName` on the `TickersHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[symbolId]` on the table `Tickers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbolId]` on the table `TickersHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `symbolId` to the `Tickers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbolId` to the `TickersHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tickers_symbol_key";

-- AlterTable
ALTER TABLE "Tickers" DROP COLUMN "symbol",
DROP COLUMN "symbolName",
ADD COLUMN     "symbolId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TickersHistory" DROP COLUMN "symbol",
DROP COLUMN "symbolName",
ADD COLUMN     "symbolId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Symbol" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "symbolName" TEXT NOT NULL,

    CONSTRAINT "Symbol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Symbol_symbol_key" ON "Symbol"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Tickers_symbolId_key" ON "Tickers"("symbolId");

-- CreateIndex
CREATE UNIQUE INDEX "TickersHistory_symbolId_key" ON "TickersHistory"("symbolId");

-- AddForeignKey
ALTER TABLE "Tickers" ADD CONSTRAINT "Tickers_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "Symbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TickersHistory" ADD CONSTRAINT "TickersHistory_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "Symbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
