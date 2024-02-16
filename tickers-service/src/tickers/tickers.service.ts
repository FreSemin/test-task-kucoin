import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import {
  DEFAULT_CRON_SYNC_TICKERS_NAME,
  DEFAULT_CRON_SYNC_TICKERS_TIME,
} from 'src/constants';

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

  private syncTickers(): void {
    this.logger.log('SyncTickers at time', Date.now());
  }

  startSyncTickersCron(): void {
    this.initCron();

    this.tickersCron.start();
  }
}
