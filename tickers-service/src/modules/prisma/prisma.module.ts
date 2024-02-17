import { Module } from '@nestjs/common';
import { PrismaTickersService } from './prisma-tickers.service';
import { PrismaTickersHistoryService } from './prisma-tickers-history.service';

@Module({
  providers: [PrismaTickersService, PrismaTickersHistoryService],
  exports: [PrismaTickersService, PrismaTickersHistoryService],
})
export class PrismaModule {}
