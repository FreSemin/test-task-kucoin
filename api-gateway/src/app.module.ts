import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SymbolModule } from './modules/symbol/symbol.module';
import { TickerModule } from './modules/ticker/ticker.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SymbolModule,
    TickerModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
