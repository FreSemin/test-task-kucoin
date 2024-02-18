import { CONVERT_FIELDS_TO_NUMBER_ERROR } from 'src/constants';
import { UtilsError } from './errors.util';

export function convertFieldsToNumber<T>(obj: Record<string, string>): T {
  const result: Partial<T> = {};

  // eslint-disable-next-line prefer-const
  for (let key in obj) {
    result[key as keyof T] = convertToFloatNumber(obj[key]) as T[keyof T];
  }

  return result as T;
}

export function convertToFloatNumber(value: string): number {
  const parsedNumber = parseFloat(value);

  if (!isNaN(parsedNumber)) {
    return parsedNumber;
  } else {
    throw new UtilsError(CONVERT_FIELDS_TO_NUMBER_ERROR);
  }
}
