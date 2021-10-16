import { Account } from '../account.entity'

export type PasswordlessAccount = Omit<Account, 'password'>
