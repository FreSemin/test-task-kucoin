import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_SORT_ASC, TICKER_NOT_FOUND_EXCEPTION } from 'src/constants';
import { ParsedPeriod, Period, Ticker, TickerHistory } from 'src/models';
import { getParsedPeriod, isSymbolId } from 'src/utils';

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

  async findHistoryBySymbol(
    symbol: string,
    period: Period,
  ): Promise<TickerHistory[]> {
    const parsedPeriod: ParsedPeriod = getParsedPeriod(period);

    if (isSymbolId(symbol)) {
      return await this.tickerHistory.findMany({
        where: {
          symbolId: Number(symbol),
          updatedTime: {
            gte: parsedPeriod.from,
            lte: parsedPeriod.to,
          },
        },
      });
    } else {
      return await this.tickerHistory.findMany({
        where: {
          symbol: {
            symbol,
          },
          updatedTime: {
            gte: parsedPeriod.from,
            lte: parsedPeriod.to,
          },
        },
      });
    }
  }
}
