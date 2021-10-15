import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BcryptService } from '../common/services/bcrypt.service'
import { Account } from './account.entity'
import { RegisterBodyDto } from './dto/register.dto'

type RegisterArgs = {
  body: RegisterBodyDto
}

@Injectable()
export class AccountsService {
  public constructor(
    @InjectRepository(Account) private readonly accountsRepository: Repository<Account>,
    private readonly bcryptService: BcryptService
  ) {}

  public async register(args: RegisterArgs): Promise<void> {
    const hashedPassword: string = await this.bcryptService.hash({ data: args.body.password })

    await this.accountsRepository.save({ email: args.body.email, password: hashedPassword })
  }
}
