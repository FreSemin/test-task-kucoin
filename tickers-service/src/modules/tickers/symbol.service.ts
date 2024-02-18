import { Injectable } from '@nestjs/common';
import { AllTickersResponse, TickerSymbolData } from 'src/models';
import { PrismaSymbolService } from '../prisma/prisma-symbol.service';

@Injectable()
export class SymbolService {
  constructor(private readonly prismaSymbolService: PrismaSymbolService) {}

  async syncSymbols(): Promise<void> {
    // TODO: add try catch
    // TODO: add api to constants and env
    const apiResponse: Response = await fetch(
      'https://api.kucoin.com/api/v1/market/allTickers',
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
