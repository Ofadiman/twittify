import { IsEmail, IsString, Length } from 'class-validator'

import { AccountConstraints } from '../enums/account-constraints.enum'

export class RegisterBodyDto {
  @IsEmail()
  public email: string

  @IsString()
  @Length(AccountConstraints.MinimumPasswordLength, AccountConstraints.MaximumPasswordLength)
  public password: string
}
