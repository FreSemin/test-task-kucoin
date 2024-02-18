import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TickerService } from './ticker.service';
import { Period, Ticker, TickerHistory } from 'src/models';

@Controller('ticker')
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Get('all')
  async findAll(): Promise<Ticker[]> {
    return await this.tickerService.findAll();
  }

  @Get(':symbolId')
  async findOneBySymbolId(
    @Param('symbolId', ParseIntPipe) symbolId: number,
  ): Promise<Ticker> {
    return await this.tickerService.findOneBySymbolId(symbolId);
  }

  @Get('info/:symbol')
  async findOneBySymbol(@Param('symbol') symbol: string): Promise<Ticker> {
    return await this.tickerService.findOneBySymbol(symbol);
  }

  @Get('/history/:symbolId')
  async findHistoryBySymbolId(
    @Param('symbolId', ParseIntPipe) symbolId: number,
    @Query() period: Period,
  ): Promise<TickerHistory[]> {
    return this.tickerService.findHistoryBySymbolId(symbolId, period);
  }
}
