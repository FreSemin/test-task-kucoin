/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Tickers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tickers_symbol_key" ON "Tickers"("symbol");
