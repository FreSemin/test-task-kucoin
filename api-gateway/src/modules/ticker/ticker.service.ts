import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Ticker } from '@prisma/client';
import { PRISMA_SORT_ASC, TICKER_NOT_FOUND_EXCEPTION } from 'src/constants';

@Injectable()
export class TickerService extends PrismaClient {
  async findAll(): Promise<Ticker[]> {
    return await this.ticker.findMany({
      include: {
        symbol: true,
      },
      orderBy: {
        symbolId: PRISMA_SORT_ASC,
      },
    });
  }

  async findOneBySymbolId(id: number): Promise<Ticker> {
    const ticker: Ticker | null = await this.ticker.findUnique({
      where: {
        symbolId: id,
      },
      include: {
        symbol: true,
      },
    });

    if (!ticker) {
      throw new NotFoundException(TICKER_NOT_FOUND_EXCEPTION(id));
    }

    return ticker;
  }

  async findOneBySymbol(symbol: string): Promise<Ticker> {
    const ticker: Ticker | null = await this.ticker.findFirst({
      where: {
        symbol: {
          symbol,
        },
      },
      include: {
        symbol: true,
      },
    });

    if (!ticker) {
      throw new NotFoundException(TICKER_NOT_FOUND_EXCEPTION(symbol));
    }

    return ticker;
  }
}
