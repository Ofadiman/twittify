import { hashSync } from 'bcrypt'

import { Account } from '../../accounts/account.entity'
import { BcryptService } from '../../common/services/bcrypt.service'

// Testing password used during development.
const password: string = `asdf1234`

export const sanchezAccount: Account = new Account()
sanchezAccount.email = `sanchez.gibson@yopmail.com`
sanchezAccount.password = hashSync(password, BcryptService.SALT_ROUNDS)

export const daisyAccount: Account = new Account()
daisyAccount.email = `daisy.hawkins@yopmail.com`
daisyAccount.password = hashSync(password, BcryptService.SALT_ROUNDS)

export const micheleAccount: Account = new Account()
micheleAccount.email = `michele.alvarez@yopmail.com`
micheleAccount.password = hashSync(password, BcryptService.SALT_ROUNDS)
