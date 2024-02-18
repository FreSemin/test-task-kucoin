import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PROMISE_STATUS_FULFILLED } from 'src/constants';
import { TickerSymbol, TickerSymbolData } from 'src/models';
import { SyncSymbolsError } from 'src/utils/errors.util';

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
            return symbol.status === PROMISE_STATUS_FULFILLED;
          })
          .map((symbol: PromiseFulfilledResult<TickerSymbol>) => symbol.value);
      })
      .catch(() => {
        throw new SyncSymbolsError();
      });
  }
}
