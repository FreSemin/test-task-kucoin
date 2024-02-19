import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { PERIOD_NOT_VALID_FORMAT } from 'src/constants';

export function IsValidPeriod(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidPeriod',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

          return dateRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return PERIOD_NOT_VALID_FORMAT(args.property);
        },
      },
    });
  };
}
