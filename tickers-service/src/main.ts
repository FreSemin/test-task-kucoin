import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TickersService } from './modules/tickers/tickers.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const tickersService: TickersService = app.get(TickersService);

  tickersService.startSyncTickersCron();
}
bootstrap();
