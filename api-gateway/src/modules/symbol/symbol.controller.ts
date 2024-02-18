import { Controller } from '@nestjs/common';
import { SymbolService } from './symbol.service';

@Controller('symbol')
export class SymbolController {
  constructor(private readonly symbolService: SymbolService) {}
}
