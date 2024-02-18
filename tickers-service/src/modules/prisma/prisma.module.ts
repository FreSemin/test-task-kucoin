import { Module } from '@nestjs/common';
import { PrismaTickersService } from './prisma-tickers.service';
import { PrismaTickersHistoryService } from './prisma-tickers-history.service';
import { PrismaSymbolService } from './prisma-symbol.service';

@Module({
  providers: [
    PrismaTickersService,
    PrismaTickersHistoryService,
    PrismaSymbolService,
  ],
  exports: [
    PrismaTickersService,
    PrismaTickersHistoryService,
    PrismaSymbolService,
  ],
})
export class PrismaModule {}
