import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Ticker, TickerHistoryData } from 'src/models';

@Injectable()
export class PrismaTickerHistoryService extends PrismaClient {
  async createTickersHistory(tickers: Ticker[]): Promise<Prisma.BatchPayload> {
    const tickersHistoryData: TickerHistoryData[] = tickers.map((ticker) => {
      const { id, ...tickerData } = ticker;

      return {
        ...tickerData,
        tickerId: id,
      };
    });

    return this.tickerHistory.createMany({
      data: tickersHistoryData,
    });
  }
}
