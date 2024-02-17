import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Ticker, TickerHistoryData } from 'src/models';

@Injectable()
export class PrismaTickersHistoryService extends PrismaClient {
  async createTickersHistory(tickers: Ticker[]): Promise<Prisma.BatchPayload> {
    const tickersHistoryInputs: TickerHistoryData[] = tickers.map((ticker) => {
      const { id, ...tickerData } = ticker;

      return {
        ...tickerData,
        tickerId: id,
      };
    });

    return this.tickersHistory.createMany({
      data: tickersHistoryInputs,
    });
  }
}
