import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SORT_ASC } from 'src/constants';
import { TickerSymbol } from 'src/models';

@Injectable()
export class SymbolService extends PrismaClient {
  async findAll(): Promise<TickerSymbol[]> {
    return await this.symbol.findMany({
      orderBy: [
        {
          id: SORT_ASC,
        },
      ],
    });
  }
}
