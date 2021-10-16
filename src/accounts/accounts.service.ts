import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BcryptService } from '../common/services/bcrypt.service'
import { Account } from './account.entity'
import { LoginResponseDto } from './dto/login.dto'
import { RegisterBodyDto } from './dto/register.dto'
import { LoginJwtPayload } from './types/login-jwt-payload.type'

type RegisterArgs = {
  body: RegisterBodyDto
}
type LoginArgs = {
  account: Omit<Account, 'password'>
}

@Injectable()
export class AccountsService {
  public constructor(
    @InjectRepository(Account) private readonly accountsRepository: Repository<Account>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  public async register(args: RegisterArgs): Promise<void> {
    const hashedPassword: string = await this.bcryptService.hash({ data: args.body.password })

    await this.accountsRepository.save({ email: args.body.email, password: hashedPassword })
  }

  public async login(args: LoginArgs): Promise<LoginResponseDto> {
    const payload: LoginJwtPayload = { email: args.account.email, sub: args.account.id }

    const accessToken: string = await this.jwtService.signAsync(payload)

    return {
      account: args.account,
      tokens: {
        access: accessToken
      }
    }
  }
}
