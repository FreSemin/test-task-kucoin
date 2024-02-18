import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TickerModule } from './modules/tickers/ticker.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TickerModule,
  ],
})
export class AppModule {}
