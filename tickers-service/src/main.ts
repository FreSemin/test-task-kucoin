import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TickerService } from './modules/tickers/ticker.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const tickerService: TickerService = app.get(TickerService);

  tickerService.startSyncTickersCron();
}
bootstrap();
