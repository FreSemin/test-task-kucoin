import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import {
  DEFAULT_CRON_SYNC_TICKERS_NAME,
  DEFAULT_CRON_SYNC_TICKERS_TIME,
} from 'src/constants';
import {
  AllTickers,
  AllTickersResponse,
  Ticker,
  TickerData,
  TickerDataForConvertFields,
} from 'src/models';
import { convertFieldsToNumber, convertToFloatNumber } from 'src/utils';
import { PrismaTickersService } from '../prisma/prisma-tickers.service';

@Injectable()
export class TickersService {
  private readonly logger = new Logger(TickersService.name);

  private tickersCron: CronJob;

  private syncCronJobName: string = '';
  private syncCronJobTime: string = '';

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
    private readonly prismaTickersService: PrismaTickersService,
  ) {
    this.syncCronJobName =
      this.configService.get<string>('CRON_SYNC_TICKERS_NAME') ??
      DEFAULT_CRON_SYNC_TICKERS_NAME;

    this.syncCronJobTime =
      this.configService.get<string>('CRON_SYNC_TICKERS_TIME') ??
      DEFAULT_CRON_SYNC_TICKERS_TIME;
  }

  private initCron(): void {
    this.schedulerRegistry.addCronJob(
      this.syncCronJobName,
      new CronJob(this.syncCronJobTime, this.syncTickers.bind(this)),
    );

    this.tickersCron = this.schedulerRegistry.getCronJob(this.syncCronJobName);
  }

  private async getAllTickers(): Promise<AllTickers<number>> {
    // TODO: add api to constants and env
    const apiResponse: Response = await fetch(
      'https://api.kucoin.com/api/v1/market/allTickers',
    );

    const allTickersResponse: AllTickersResponse = await apiResponse.json();

    if (allTickersResponse.data) {
      const convertedTickers: TickerData<number>[] =
        allTickersResponse.data.ticker.map((ticker): TickerData<number> => {
          const { symbol, symbolName, ...fieldsToNumber } = ticker;
          return {
            symbol,
            symbolName,
            ...convertFieldsToNumber<TickerDataForConvertFields<number>>(
              fieldsToNumber,
            ),
          };
        });

      return {
        time: convertToFloatNumber(allTickersResponse.data.time),
        ticker: convertedTickers,
      };
    } else {
      // TODO: throw custom error
      throw new Error('Get All Tickers Error');
    }
  }

  private async updateTickers(
    tickersData: AllTickers<number>,
  ): Promise<Ticker[]> {
    return await Promise.allSettled([
      ...tickersData.ticker.map((ticker) => {
        return new Promise(async (resolve, reject) => {
          try {
            resolve(
              await this.prismaTickersService.upsetTicker(
                ticker,
                tickersData.time,
              ),
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

  private async syncTickers(): Promise<void> {
    try {
      this.logger.log(
        `Cron Job: ${this.syncCronJobName} started: ${new Date().toUTCString()}`,
      );

      const allTickers: AllTickers<number> = await this.getAllTickers();

      const updatedTickers: Ticker[] = await this.updateTickers(allTickers);

      this.logger.log(allTickers.ticker.length);
      this.logger.log(updatedTickers.length);

      this.logger.log(
        `Cron Job: ${this.syncCronJobName} finished: ${new Date().toUTCString()}`,
      );
    } catch (error) {
      // TODO: improve error handling
      this.logger.error(error.message);
    }
  }

  startSyncTickersCron(): void {
    this.initCron();

    this.tickersCron.start();
  }
}
