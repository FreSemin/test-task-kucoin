import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsRepeated(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isRepeated',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const obj = args.object as Record<string, unknown>;

          if (!obj.hasOwnProperty(property)) {
            return false;
          }

          return value === obj[property];
        },
        defaultMessage(): string {
          // TODO: add msg to constants
          return `${propertyName} needs to be identical to ${property}`;
        },
      },
    });
  };
}
