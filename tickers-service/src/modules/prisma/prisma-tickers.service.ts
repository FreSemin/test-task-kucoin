import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Ticker, TickerData } from 'src/models';

@Injectable()
export class PrismaTickersService extends PrismaClient {
  async upsetTicker(
    ticker: TickerData<number>,
    updatedTime: number,
  ): Promise<Ticker> {
    return this.tickers.upsert({
      where: {
        symbol: ticker.symbol,
      },
      update: {
        ...ticker,
        updatedTime,
      },
      create: {
        ...ticker,
        updatedTime,
      },
    });
  }
}
