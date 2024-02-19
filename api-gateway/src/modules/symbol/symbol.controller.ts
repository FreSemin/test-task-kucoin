import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { TickerSymbol } from 'src/models';
import { AuthGuard } from '../auth/auth.guard';

@Controller('symbol')
export class SymbolController {
  constructor(private readonly symbolService: SymbolService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll(): Promise<TickerSymbol[]> {
    return await this.symbolService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':symbol')
  async findOneById(@Param('symbol') symbol: string): Promise<TickerSymbol> {
    return await this.symbolService.findOneBySymbol(symbol);
  }
}
