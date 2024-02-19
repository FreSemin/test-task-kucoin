export const PRISMA_SORT_ASC = 'asc';
export const PRISMA_SORT_DESC = 'desc';

export const SYMBOL_NOT_FOUND_EXCEPTION = (symbol: string | number) =>
  `Symbol: ${symbol} was not found!`;
export const TICKER_NOT_FOUND_EXCEPTION = (symbol: string | number) =>
  `Ticker: ${symbol} was not found!`;
export const USER_NOT_FOUND_EXCEPTION = (value: string | number) =>
  `User: ${value} was not found!`;
export const PROPERTY_TAKEN_EXCEPTION = (property: string | number) =>
  `${property} already taken!`;
export const PROPERTY_IDENTICAL_TO_EXCEPTION = (
  property: string,
  propertyIdenticalTo: string,
) => `${property} needs to be identical to ${propertyIdenticalTo}!`;

export const PERIOD_NOT_VALID_FORMAT = (propertyName: string) =>
  `${propertyName} should be in format: YYYY-MM-DDTHH:mm`;
