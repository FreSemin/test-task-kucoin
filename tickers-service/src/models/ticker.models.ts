import { ApiResponse, TickerSymbolData } from '.';

export type TickerFieldsType = string | number;

export type Ticker = TickerData<number> & {
  id: number;
  symbolId: number;
  updatedTime: bigint;
};

export type TickerHistory = TickerHistoryData & {
  id: number;
};

export type TickerHistoryData = TickerDataFields<number> & {
  tickerId: number;
  symbolId: number;
  updatedTime: bigint;
};

// Hint:
// FieldsType should be 'string' when get data from api
// FieldsType should be 'number' when work with data
export type TickerData<FieldsType extends TickerFieldsType> =
  TickerSymbolData & {
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

export type TickerDataFields<T extends TickerFieldsType> = Omit<
  TickerData<T>,
  'symbol' | 'symbolName'
>;

export type AllTickersResponse = ApiResponse<AllTickers<string>>;

export type AllTickers<T extends TickerFieldsType> = {
  time: T;
  ticker: TickerData<T>[];
};
