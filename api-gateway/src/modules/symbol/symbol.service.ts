import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_SORT_ASC, SYMBOL_NOT_FOUND_EXCEPTION } from 'src/constants';
import { TickerSymbol } from 'src/models';

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
}
