import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

import { AccountConstraints } from '../enums/account-constraints.enum'
import { AuthTokens, PasswordlessAccount } from './common.dto'

export class LoginBodyDto {
  @IsEmail()
  @MaxLength(AccountConstraints.EmailMaxLength)
  @ApiProperty({ example: `john.doe@gmail.com` })
  public email: string

  @IsString()
  @MaxLength(AccountConstraints.PasswordMaxLength)
  @MinLength(AccountConstraints.PasswordMinLength)
  @ApiProperty({ example: `HTZMTeLCUE` })
  public password: string
}

export class LoginResponseDto {
  public account: PasswordlessAccount
  public tokens: AuthTokens
}
