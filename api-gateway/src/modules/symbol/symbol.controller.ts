import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { TickerSymbol } from 'src/models';

@Controller('symbol')
export class SymbolController {
  constructor(private readonly symbolService: SymbolService) {}

  @Get('all')
  async findAll(): Promise<TickerSymbol[]> {
    return await this.symbolService.findAll();
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TickerSymbol> {
    return await this.symbolService.findOneById(id);
  }
}
