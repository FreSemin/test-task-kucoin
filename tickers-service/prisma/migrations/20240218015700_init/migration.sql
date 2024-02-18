-- CreateTable
CREATE TABLE "Symbol" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "symbolName" TEXT NOT NULL,

    CONSTRAINT "Symbol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticker" (
    "id" SERIAL NOT NULL,
    "symbolId" INTEGER NOT NULL,
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
    "updatedTime" BIGINT NOT NULL,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TickerHistory" (
    "id" SERIAL NOT NULL,
    "symbolId" INTEGER NOT NULL,
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
    "updatedTime" BIGINT NOT NULL,
    "tickerId" INTEGER NOT NULL,

    CONSTRAINT "TickerHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Symbol_symbol_key" ON "Symbol"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Ticker_symbolId_key" ON "Ticker"("symbolId");

-- AddForeignKey
ALTER TABLE "Ticker" ADD CONSTRAINT "Ticker_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "Symbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TickerHistory" ADD CONSTRAINT "TickerHistory_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TickerHistory" ADD CONSTRAINT "TickerHistory_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "Symbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
