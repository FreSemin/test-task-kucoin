/*
  Warnings:

  - You are about to drop the `Ticker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TickerHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TickerHistory" DROP CONSTRAINT "TickerHistory_tickerId_fkey";

-- DropTable
DROP TABLE "Ticker";

-- DropTable
DROP TABLE "TickerHistory";

-- CreateTable
CREATE TABLE "Tickers" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "symbolName" TEXT NOT NULL,
    "buy" DOUBLE PRECISION NOT NULL,
    "sell" DOUBLE PRECISION NOT NULL,
    "bestBidSize" DOUBLE PRECISION NOT NULL,
    "bestAskSize" DOUBLE PRECISION NOT NULL,
    "changeRate" DOUBLE PRECISION NOT NULL,
    "changePrice" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "vol" DOUBLE PRECISION NOT NULL,
    "volValue" DOUBLE PRECISION NOT NULL,
    "last" DOUBLE PRECISION NOT NULL,
    "averagePrice" DOUBLE PRECISION NOT NULL,
    "takerFeeRate" DOUBLE PRECISION NOT NULL,
    "makerFeeRate" DOUBLE PRECISION NOT NULL,
    "takerCoefficient" DOUBLE PRECISION NOT NULL,
    "makerCoefficient" DOUBLE PRECISION NOT NULL,
    "updatedTime" INTEGER NOT NULL,

    CONSTRAINT "Tickers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TickersHistory" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "symbolName" TEXT NOT NULL,
    "buy" DOUBLE PRECISION NOT NULL,
    "sell" DOUBLE PRECISION NOT NULL,
    "bestBidSize" DOUBLE PRECISION NOT NULL,
    "bestAskSize" DOUBLE PRECISION NOT NULL,
    "changeRate" DOUBLE PRECISION NOT NULL,
    "changePrice" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "vol" DOUBLE PRECISION NOT NULL,
    "volValue" DOUBLE PRECISION NOT NULL,
    "last" DOUBLE PRECISION NOT NULL,
    "averagePrice" DOUBLE PRECISION NOT NULL,
    "takerFeeRate" DOUBLE PRECISION NOT NULL,
    "makerFeeRate" DOUBLE PRECISION NOT NULL,
    "takerCoefficient" DOUBLE PRECISION NOT NULL,
    "makerCoefficient" DOUBLE PRECISION NOT NULL,
    "updatedTime" INTEGER NOT NULL,
    "tickerId" INTEGER NOT NULL,

    CONSTRAINT "TickersHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TickersHistory" ADD CONSTRAINT "TickersHistory_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Tickers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
