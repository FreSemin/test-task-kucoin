import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TickerSymbol, TickerSymbolData } from 'src/models';

@Injectable()
export class PrismaSymbolService extends PrismaClient {
  async findOrCreate(
    tickerSymbolData: TickerSymbolData,
  ): Promise<TickerSymbol> {
    return this.symbol.upsert({
      where: {
        symbol: tickerSymbolData.symbol,
      },
      update: {},
      create: {
        ...tickerSymbolData,
      },
    });
  }

  // TODO: add return type
  async syncSymbols(symbolsData: TickerSymbolData[]): Promise<TickerSymbol[]> {
    return await Promise.allSettled([
      ...symbolsData.map((symbolData) => {
        return new Promise(async (resolve, reject) => {
          try {
            resolve(
              await this.symbol.upsert({
                where: {
                  symbol: symbolData.symbol,
                },
                update: {
                  symbolName: symbolData.symbolName,
                },
                create: {
                  ...symbolData,
                },
              }),
            );
          } catch (error) {
            reject(error);
          }
        });
      }),
    ])
      .then((symbols: Array<PromiseSettledResult<TickerSymbol>>) => {
        return symbols
          .filter((symbol: PromiseSettledResult<TickerSymbol>) => {
            // TODO: add status to constants
            return symbol.status === 'fulfilled';
          })
          .map((symbol: PromiseFulfilledResult<TickerSymbol>) => symbol.value);
      })
      .catch((error) => {
        // TODO: create custom error
        throw error;
      });
  }
}
