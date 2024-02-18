import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Ticker, TickerData, TickerSymbol } from 'src/models';
import { PrismaSymbolService } from './prisma-symbol.service';
import { PROMISE_STATUS_FULFILLED } from 'src/constants';

@Injectable()
export class PrismaTickersService extends PrismaClient {
  constructor(private readonly prismaSymbolService: PrismaSymbolService) {
    super();
  }

  async syncTickers(
    tickersData: TickerData<number>[],
    updatedTime: number,
  ): Promise<Ticker[]> {
    return await Promise.allSettled([
      ...tickersData.map((ticker) => {
        return new Promise(async (resolve, reject) => {
          try {
            const { symbol, symbolName, ...tickerData } = ticker;

            const tickerSymbol: TickerSymbol =
              await this.prismaSymbolService.findOrCreate({
                symbol,
                symbolName,
              });

            resolve(
              await this.tickers.upsert({
                where: {
                  symbolId: tickerSymbol.id,
                },
                update: {
                  ...tickerData,
                  updatedTime,
                },
                create: {
                  ...tickerData,
                  updatedTime,
                  symbolId: tickerSymbol.id,
                },
              }),
            );
          } catch (error) {
            reject(error);
          }
        });
      }),
    ])
      .then((updatedTickers: Array<PromiseSettledResult<Ticker>>) => {
        return updatedTickers
          .filter((ticker: PromiseSettledResult<Ticker>) => {
            return ticker.status === PROMISE_STATUS_FULFILLED;
          })
          .map((ticker: PromiseFulfilledResult<Ticker>) => ticker.value);
      })
      .catch((error) => {
        // TODO: create custom error
        throw error;
      });
  }
}
