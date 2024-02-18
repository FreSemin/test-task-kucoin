import { Module } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SymbolService } from './symbol.service';

@Module({
  imports: [PrismaModule],
  providers: [TickersService, SymbolService],
})
export class TickersModule {}
