import { Injectable } from '@nestjs/common';
import { AllTickersResponse, TickerSymbolData } from 'src/models';
import { PrismaSymbolService } from '../prisma/prisma-symbol.service';
import { COIN_API_ALLTICKERS, COIN_API_URL } from 'src/constants';

@Injectable()
export class SymbolService {
  constructor(private readonly prismaSymbolService: PrismaSymbolService) {}

  async syncSymbols(): Promise<void> {
    // TODO: add try catch
    const apiResponse: Response = await fetch(
      COIN_API_URL + COIN_API_ALLTICKERS,
    );

    const allTickersResponse: AllTickersResponse = await apiResponse.json();

    if (allTickersResponse.data) {
      const symbolsData: TickerSymbolData[] =
        allTickersResponse.data.ticker.map((ticker) => {
          return {
            symbol: ticker.symbol,
            symbolName: ticker.symbolName,
          };
        });

      await this.prismaSymbolService.syncSymbols(symbolsData);
    } else {
      // TODO: throw custom error
      throw new Error('Get All Tickers Error');
    }
  }
}
