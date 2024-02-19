import { Module } from '@nestjs/common';
import { PrismaTickerService } from './prisma-ticker.service';
import { PrismaTickerHistoryService } from './prisma-ticker-history.service';
import { PrismaSymbolService } from './prisma-symbol.service';

@Module({
  providers: [
    PrismaTickerService,
    PrismaTickerHistoryService,
    PrismaSymbolService,
  ],
  exports: [
    PrismaTickerService,
    PrismaTickerHistoryService,
    PrismaSymbolService,
  ],
})
export class PrismaModule {}
