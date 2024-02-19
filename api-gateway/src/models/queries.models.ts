import { IsOptional } from 'class-validator';
import { IsValidPeriod } from 'src/validation';

export type ParsedPeriod = {
  from: number;
  to: number;
};

export class Period {
  @IsValidPeriod()
  from: string;

  @IsValidPeriod()
  @IsOptional()
  to?: string;
}
