import {
  GET_ALL_TICKERS_ERROR,
  SYNC_SYMBOLS_ERROR,
  SYNC_TICKERS_ERROR,
  UTILS_ERROR,
} from 'src/constants';

export class SyncTickersError extends Error {
  constructor(message = SYNC_TICKERS_ERROR) {
    super(message);
  }
}

export class SyncSymbolsError extends Error {
  constructor(message = SYNC_SYMBOLS_ERROR) {
    super(message);
  }
}

export class GetAllTickersError extends Error {
  constructor(message = GET_ALL_TICKERS_ERROR) {
    super(message);
  }
}

export class UtilsError extends Error {
  constructor(message = UTILS_ERROR) {
    super(message);
  }
}
