import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TickersService {
  private readonly logger = new Logger(TickersService.name);

  private tickersCron: CronJob;

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  private initCron(): void {
    this.schedulerRegistry.addCronJob(
      'sync_tickers',
      new CronJob('*/5 * * * * *', this.syncTickers.bind(this)),
    );

    this.tickersCron = this.schedulerRegistry.getCronJob('sync_tickers');
  }

  private syncTickers(): void {
    this.logger.log('SyncTickers at time', Date.now());
  }

  startSyncTickersCron(): void {
    this.initCron();

    this.tickersCron.start();
  }
}
