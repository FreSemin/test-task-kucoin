import { Length, IsEmail } from 'class-validator';
import { IsRepeated } from 'src/validation';
import { UserDoesNotExist } from '../validation/user-does-not-exist.constraint';

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
