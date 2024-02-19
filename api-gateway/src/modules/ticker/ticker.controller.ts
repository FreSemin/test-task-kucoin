import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TickerService } from './ticker.service';
import { Period, Ticker, TickerHistory } from 'src/models';
import { AuthGuard } from '../auth/auth.guard';

@Controller('ticker')
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll(): Promise<Ticker[]> {
    return await this.tickerService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':symbol')
  async findOneBySymbol(@Param('symbol') symbol: string): Promise<Ticker> {
    return await this.tickerService.findOneBySymbol(symbol);
  }

  @UseGuards(AuthGuard)
  @Get('/history/:symbol')
  async findHistoryBySymbol(
    @Param('symbol') symbol: string,
    @Query() period: Period,
  ): Promise<TickerHistory[]> {
    return this.tickerService.findHistoryBySymbol(symbol, period);
  }
}
