export const PRISMA_SORT_ASC = 'asc';
export const PRISMA_SORT_DESC = 'desc';

export const SYMBOL_NOT_FOUND_EXCEPTION = (symbol: string | number) =>
  `Symbol: ${symbol} was not found!`;
export const TICKER_NOT_FOUND_EXCEPTION = (symbol: string | number) =>
  `Ticker: ${symbol} was not found!`;
