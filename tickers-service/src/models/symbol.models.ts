export type TickerSymbol = TickerSymbolData & {
  id: number;
};

export type TickerSymbolData = {
  symbol: string;
  symbolName: string;
};
