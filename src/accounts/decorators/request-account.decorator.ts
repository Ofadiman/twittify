import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

import { Account } from '../account.entity'

export const RequestAccount: ReturnType<typeof createParamDecorator> = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Account => {
    const request: Request = ctx.switchToHttp().getRequest()

    return request.user as Account
  }
)
