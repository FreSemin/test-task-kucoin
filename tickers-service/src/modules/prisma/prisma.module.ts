import { Module } from '@nestjs/common';
import { PrismaTickersService } from './prisma-tickers.service';

@Module({
  providers: [PrismaTickersService],
  exports: [PrismaTickersService],
})
export class PrismaModule {}
