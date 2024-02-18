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
  TickerDataFields,
} from 'src/models';
import { convertFieldsToNumber, convertToFloatNumber } from 'src/utils';
import { PrismaTickersService } from '../prisma/prisma-tickers.service';
import { PrismaTickersHistoryService } from '../prisma/prisma-tickers-history.service';
import { Prisma } from '@prisma/client';
import { SymbolService } from './symbol.service';

@Injectable()
export class TickersService {
  private readonly logger = new Logger(TickersService.name);

  private tickersCron: CronJob;

  private syncCronJobName: string = '';
  private syncCronJobTime: string = '';

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
    private readonly symbolService: SymbolService,
    private readonly prismaTickersService: PrismaTickersService,
    private readonly prismaTickersHistoryService: PrismaTickersHistoryService,
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
            ...convertFieldsToNumber<TickerDataFields<number>>(fieldsToNumber),
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
    return await this.prismaTickersService.syncTickers(
      tickersData.ticker,
      tickersData.time,
    );
  }

  private async createTickersHistory(
    tickers: Ticker[],
  ): Promise<Prisma.BatchPayload> {
    return await this.prismaTickersHistoryService.createTickersHistory(tickers);
  }

  private async syncTickers(): Promise<void> {
    try {
      this.logger.log(
        `Cron Job: ${this.syncCronJobName} started: ${new Date().toUTCString()}`,
      );

      const allTickers: AllTickers<number> = await this.getAllTickers();

      const updatedTickers: Ticker[] = await this.updateTickers(allTickers);

      const createdTickersHistory: Prisma.BatchPayload =
        await this.createTickersHistory(updatedTickers);

      if (createdTickersHistory.count !== updatedTickers.length) {
        // TODO: create custom error
        throw new Error(
          'Number of created histories is not equal to updated tickers',
        );
      }
    } catch (error) {
      // TODO: improve error handling
      this.logger.error(error.message);
    } finally {
      this.logger.log(
        `Cron Job: ${this.syncCronJobName} finished: ${new Date().toUTCString()}`,
      );
    }
  }

  async startSyncTickersCron(): Promise<void> {
    // TODO: add try catch
    await this.symbolService.syncSymbols();

    this.initCron();

    this.tickersCron.start();
  }
}
