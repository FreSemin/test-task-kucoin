import { Module } from '@nestjs/common';
import { PrismaTickersService } from './prisma-tickers.service';
import { PrismaTickerHistoryService } from './prisma-ticker-history.service';
import { PrismaSymbolService } from './prisma-symbol.service';

@Module({
  providers: [
    PrismaTickersService,
    PrismaTickerHistoryService,
    PrismaSymbolService,
  ],
  exports: [
    PrismaTickersService,
    PrismaTickerHistoryService,
    PrismaSymbolService,
  ],
})
export class PrismaModule {}
