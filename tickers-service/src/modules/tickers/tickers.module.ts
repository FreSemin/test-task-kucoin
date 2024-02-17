import { Module } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TickersService],
})
export class TickersModule {}
