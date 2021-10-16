import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { omit } from 'lodash'
import { Strategy } from 'passport-local'
import { Repository } from 'typeorm'

import { BcryptService } from '../../common/services/bcrypt.service'
import { Account } from '../account.entity'
import { AccountsService } from '../accounts.service'
import { PassportStrategies } from '../enums/passport-strategies.enum'
import { PasswordlessAccount } from '../types/passwordless-account.type'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, PassportStrategies.Local) {
  public constructor(
    private readonly accountsService: AccountsService,
    @InjectRepository(Account) private readonly accountsRepository: Repository<Account>,
    private readonly bcryptService: BcryptService
  ) {
    super({
      usernameField: `email`
    })
  }

  public async validate(email: string, password: string): Promise<PasswordlessAccount> {
    const account: Account | undefined = await this.accountsRepository.findOne({ where: { email } })

    if (account === undefined) {
      throw new NotFoundException()
    }

    const isPasswordCorrect: boolean = await this.bcryptService.compare({
      data: password,
      encryptedData: account.password
    })

    if (!isPasswordCorrect) {
      throw new UnauthorizedException()
    }

    return omit(account, [`password`])
  }
}
