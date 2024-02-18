import { Controller, Get, Param, Query } from '@nestjs/common';
import { TickerService } from './ticker.service';
import { Period, Ticker, TickerHistory } from 'src/models';

@Controller('ticker')
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Get('all')
  async findAll(): Promise<Ticker[]> {
    return await this.tickerService.findAll();
  }

  @Get(':symbol')
  async findOneBySymbol(@Param('symbol') symbol: string): Promise<Ticker> {
    return await this.tickerService.findOneBySymbol(symbol);
  }

  @Get('/history/:symbol')
  async findHistoryBySymbol(
    @Param('symbol') symbol: string,
    @Query() period: Period,
  ): Promise<TickerHistory[]> {
    return this.tickerService.findHistoryBySymbol(symbol, period);
  }
}