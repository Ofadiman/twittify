import { Request } from 'express'

import { Account } from '../../accounts/account.entity'

export type AuthenticatedRequest = Request & {
  user: Account
}
