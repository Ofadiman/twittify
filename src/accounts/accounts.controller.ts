import { Body, Controller, Post } from '@nestjs/common'

import { AccountsService } from './accounts.service'
import { RegisterBodyDto } from './dto/register.dto'

@Controller(`accounts`)
export class AccountsController {
  public constructor(private readonly accountsService: AccountsService) {}

  @Post(`register`)
  public async register(@Body() body: RegisterBodyDto): Promise<void> {
    return this.accountsService.register({ body })
  }
}
