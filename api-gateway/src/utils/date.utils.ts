import { ParsedPeriod, Period } from 'src/models';

export function getParsedPeriod(period: Period): ParsedPeriod {
  return {
    from: new Date(period.from).getTime(),
    to: new Date(period.to ?? new Date()).getTime(),
  };
}
