import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_SORT_ASC, SYMBOL_NOT_FOUND_EXCEPTION } from 'src/constants';
import { TickerSymbol } from 'src/models';
import { isSymbolId } from 'src/utils';

@Injectable()
export class SymbolService extends PrismaClient {
  async findAll(): Promise<TickerSymbol[]> {
    return await this.symbol.findMany({
      orderBy: [
        {
          id: PRISMA_SORT_ASC,
        },
      ],
    });
  }

  async findOneBySymbol(symbol: string): Promise<TickerSymbol> {
    let tickerSymbol: TickerSymbol | null = null;

    if (isSymbolId(symbol)) {
      tickerSymbol = await this.symbol.findUnique({
        where: { id: Number(symbol) },
      });
    } else {
      tickerSymbol = await this.symbol.findUnique({
        where: { symbol },
      });
    }

    if (!tickerSymbol) {
      throw new NotFoundException(SYMBOL_NOT_FOUND_EXCEPTION(symbol));
    }

    return tickerSymbol;
  }
}
