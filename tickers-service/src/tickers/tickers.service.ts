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
  TickerForConvertFields,
} from 'src/models';
import { convertFieldsToNumber, convertToFloatNumber } from 'src/utils';

@Injectable()
export class TickersService {
  private readonly logger = new Logger(TickersService.name);

  private tickersCron: CronJob;

  private syncCronJobName: string = '';
  private syncCronJobTime: string = '';

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
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
      const convertedTickers: Ticker<number>[] =
        allTickersResponse.data.ticker.map((ticker): Ticker<number> => {
          const { symbol, symbolName, ...fieldsToNumber } = ticker;
          return {
            symbol,
            symbolName,
            ...convertFieldsToNumber<TickerForConvertFields<number>>(
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

  private async syncTickers(): Promise<void> {
    try {
      this.logger.log(
        `Cron Job: ${this.syncCronJobName} started: ${Date.now()}`,
      );

      const allTickers: AllTickers<number> = await this.getAllTickers();

      this.logger.log(
        `Cron Job: ${this.syncCronJobName} finished: ${Date.now()}`,
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
