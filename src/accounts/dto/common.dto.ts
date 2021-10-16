import { ApiProperty, OmitType } from '@nestjs/swagger'

import { Account } from '../account.entity'

export class PasswordlessAccount extends OmitType(Account, [`password`]) {}

export class AuthTokens {
  @ApiProperty({
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9mYWRpbWFuQGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNjM0MzgyNDQyLCJleHAiOjE2MzQzODYwNDIsImlzcyI6InR3aXR0ZXItY2xvbmUifQ.HQtPhQ8xS0Af8pStmCx0wqKbecCQ3F9MBUjvhX84etc`
  })
  public access: string
}
