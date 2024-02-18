import { Injectable } from '@nestjs/common';
import { PrismaClient, Ticker } from '@prisma/client';
import { PRISMA_SORT_ASC } from 'src/constants';

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
}
