import { Controller, Get } from '@nestjs/common';
import { TickerService } from './ticker.service';
import { Ticker } from '@prisma/client';

@Controller('ticker')
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Get('all')
  async findAll(): Promise<Ticker[]> {
    return await this.tickerService.findAll();
  }
}
