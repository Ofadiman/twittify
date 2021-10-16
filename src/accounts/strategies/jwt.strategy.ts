import { Injectable, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { omit } from 'lodash'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'

import { EnvironmentVariables } from '../../configuration/enums/environment-variables.enum'
import { Account } from '../account.entity'
import { PassportStrategies } from '../enums/passport-strategies.enum'
import { LoginJwtPayload } from '../types/login-jwt-payload.type'
import { PasswordlessAccount } from '../types/passwordless-account.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, PassportStrategies.Jwt) {
  public constructor(@InjectRepository(Account) private readonly accountsRepository: Repository<Account>) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env[EnvironmentVariables.JwtSecret]
    })
  }

  public async validate(payload: LoginJwtPayload): Promise<PasswordlessAccount> {
    const account: Account | undefined = await this.accountsRepository.findOne(payload.sub)

    if (account === undefined) {
      throw new NotFoundException()
    }

    return omit(account, [`password`])
  }
}
