import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

import { AccountConstraints } from '../enums/account-constraints.enum'

export class RegisterBodyDto {
  @IsEmail()
  @MaxLength(AccountConstraints.EmailMaxLength)
  @ApiProperty({ example: `john.doe@gmail.com` })
  public email: string

  @IsString()
  @MinLength(AccountConstraints.PasswordMaxLength)
  @MaxLength(AccountConstraints.PasswordMaxLength)
  @ApiProperty({ example: `HTZMTeLCUE` })
  public password: string
}
