import { Controller } from '@nestjs/common';
import { TickerService } from './ticker.service';

@Controller('ticker')
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}
}
