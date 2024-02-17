import { ApiResponse } from '.';

export type TickerFieldsType = string | number;

export type Ticker = TickerData<number> & {
  id: number;
  updatedTime: bigint;
};

export type TickerHistory = Ticker & {
  id: number;
  tickerId: number;
};

export type TickerHistoryData = TickerData<number> & {
  tickerId: number;
  updatedTime: bigint;
};

// Hint:
// FieldsType should be 'string' when get data from api
// FieldsType should be 'number' when work with data
export type TickerData<FieldsType extends TickerFieldsType> = {
  symbol: string;
  symbolName: string;
  buy: FieldsType;
  sell: FieldsType;
  bestBidSize: FieldsType;
  bestAskSize: FieldsType;
  changeRate: FieldsType;
  changePrice: FieldsType;
  high: FieldsType;
  low: FieldsType;
  vol: FieldsType;
  volValue: FieldsType;
  last: FieldsType;
  averagePrice: FieldsType;
  takerFeeRate: FieldsType;
  makerFeeRate: FieldsType;
  takerCoefficient: FieldsType;
  makerCoefficient: FieldsType;
};

export type TickerDataForConvertFields<T extends TickerFieldsType> = Omit<
  TickerData<T>,
  'symbol' | 'symbolName'
>;

export type AllTickersResponse = ApiResponse<AllTickers<string>>;

export type AllTickers<T extends TickerFieldsType> = {
  time: T;
  ticker: TickerData<T>[];
};
