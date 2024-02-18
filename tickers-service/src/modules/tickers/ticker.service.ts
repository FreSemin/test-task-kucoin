import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import {
  COIN_API_ALLTICKERS,
  COIN_API_URL,
  CREATED_TICKERS_HISTORIES_COUNT_ERROR,
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
import { PrismaTickerService } from '../prisma/prisma-ticker.service';
import { PrismaTickerHistoryService } from '../prisma/prisma-ticker-history.service';
import { Prisma } from '@prisma/client';
import { SymbolService } from './symbol.service';
import { GetAllTickersError, SyncTickersError } from 'src/utils/errors.util';

@Injectable()
export class TickerService {
  private readonly logger = new Logger(TickerService.name);

  private tickersCron: CronJob;

  private syncCronJobName: string = '';
  private syncCronJobTime: string = '';

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
    private readonly symbolService: SymbolService,
    private readonly prismaTickerService: PrismaTickerService,
    private readonly prismaTickerHistoryService: PrismaTickerHistoryService,
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
    const apiResponse: Response = await fetch(
      COIN_API_URL + COIN_API_ALLTICKERS,
    );

    const allTickersResponse: AllTickersResponse = await apiResponse.json();

    if (allTickersResponse.data) {
      const convertedTickersData: TickerData<number>[] =
        allTickersResponse.data.ticker.map((tickerData): TickerData<number> => {
          const { symbol, symbolName, ...fieldsToNumber } = tickerData;
          return {
            symbol,
            symbolName,
            ...convertFieldsToNumber<TickerDataFields<number>>(fieldsToNumber),
          };
        });

      return {
        time: convertToFloatNumber(allTickersResponse.data.time),
        ticker: convertedTickersData,
      };
    } else {
      throw new GetAllTickersError();
    }
  }

  private async updateTickers(
    allTickers: AllTickers<number>,
  ): Promise<Ticker[]> {
    return await this.prismaTickerService.syncTickers(
      allTickers.ticker,
      allTickers.time,
    );
  }

  private async createTickersHistory(
    tickers: Ticker[],
  ): Promise<Prisma.BatchPayload> {
    return await this.prismaTickerHistoryService.createTickersHistory(tickers);
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
        throw new SyncTickersError(CREATED_TICKERS_HISTORIES_COUNT_ERROR);
      }
    } catch (error) {
      this.logger.error(error.message);
    } finally {
      this.logger.log(
        `Cron Job: ${this.syncCronJobName} finished: ${new Date().toUTCString()}`,
      );
    }
  }

  async startSyncTickersCron(): Promise<void> {
    try {
      await this.symbolService.syncSymbols();

      this.initCron();

      this.tickersCron.start();
    } catch (error) {
      this.logger.error(
        `Cron Job: ${this.syncCronJobName} initialization Error: `,
        error.message,
      );
    }
  }
}
