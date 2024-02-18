import { Module } from '@nestjs/common';
import { SymbolService } from './symbol.service';

@Module({
  providers: [SymbolService],
})
export class SymbolModule {}
