import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TickersModule } from './tickers/tickers.module';

@Module({
  imports: [ConfigModule.forRoot(), TickersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
