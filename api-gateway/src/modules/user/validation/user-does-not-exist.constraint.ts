import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserDoesNotExistConstraint
  implements ValidatorConstraintInterface
{
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const entity = await this.prismaClient.user.findFirst({
      where: {
        [validationArguments.property]: value,
      },
    });

    return entity === null;
  }

  defaultMessage?(validationArguments: ValidationArguments): string {
    // TODO: add msg to constants

    return `${validationArguments.property} already taken`;
  }
}

export function UserDoesNotExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserDoesNotExistConstraint,
    });
  };
}
