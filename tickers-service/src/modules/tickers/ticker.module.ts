import { Module } from '@nestjs/common';
import { TickerService } from './ticker.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SymbolService } from './symbol.service';

@Module({
  imports: [PrismaModule],
  providers: [TickerService, SymbolService],
})
export class TickerModule {}
