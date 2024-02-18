import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SymbolModule } from './modules/symbol/symbol.module';
import { TickerModule } from './modules/ticker/ticker.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), SymbolModule, TickerModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
