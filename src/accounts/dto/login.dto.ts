import { IsEmail, IsString, Length } from 'class-validator'

import { Account } from '../account.entity'
import { AccountConstraints } from '../enums/account-constraints.enum'

export class LoginBodyDto {
  @IsEmail()
  public email: string

  @IsString()
  @Length(AccountConstraints.MinimumPasswordLength, AccountConstraints.MaximumPasswordLength)
  public password: string
}

export class LoginResponseDto {
  public account: Omit<Account, 'password'>
  public tokens: {
    access: string
  }
}
