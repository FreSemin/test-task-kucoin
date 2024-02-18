import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Ticker, TickerData, TickerSymbol } from 'src/models';

@Injectable()
export class PrismaTickersService extends PrismaClient {
  async syncTickers(
    tickersData: TickerData<number>[],
    updatedTime: number,
  ): Promise<Ticker[]> {
    return await Promise.allSettled([
      ...tickersData.map((ticker) => {
        return new Promise(async (resolve, reject) => {
          try {
            const { symbol, symbolName, ...tickerData } = ticker;

            // TODO: add or create from service
            // TODO: upsert maybe
            const tickerSymbol: TickerSymbol =
              (await this.symbol.findUnique({
                where: {
                  symbol,
                },
              })) ||
              (await this.symbol.create({ data: { symbol, symbolName } }));

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
            // TODO: add status to constants
            return ticker.status === 'fulfilled';
          })
          .map((ticker: PromiseFulfilledResult<Ticker>) => ticker.value);
      })
      .catch((error) => {
        // TODO: create custom error
        throw error;
      });
  }
}
