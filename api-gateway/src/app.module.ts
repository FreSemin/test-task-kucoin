import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SymbolModule } from './modules/symbol/symbol.module';

@Module({
  imports: [ConfigModule.forRoot(), SymbolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
