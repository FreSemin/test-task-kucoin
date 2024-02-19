import { User as PrismaUser } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Length, IsEmail } from 'class-validator';
import { UserDoesNotExist } from 'src/modules/user/validation/user-does-not-exist.constraint';
import { IsRepeated } from 'src/validation';

export class User implements PrismaUser {
  id: number;
  name: string;
  email: string;

  @Exclude()
  password: string;

  constructor(partial?: Partial<PrismaUser>) {
    Object.assign(this, partial);
  }
}

export class CreateUserDto {
  @Length(3)
  name: string;

  @IsEmail()
  @UserDoesNotExist()
  email: string;

  @Length(8)
  password: string;

  @Length(8)
  @IsRepeated('password')
  retypedPassword: string;
}

export class UserSignInDto {
  @IsEmail()
  email: string;

  @Length(8)
  password: string;
}

export type AuthToken = {
  access_token: string;
};
