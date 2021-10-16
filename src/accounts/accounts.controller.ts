import { Body, Controller, Post, UseGuards } from '@nestjs/common'

import { Account } from './account.entity'
import { AccountsService } from './accounts.service'
import { PublicRoute } from './decorators/public-route.decorator'
import { RequestAccount } from './decorators/request-account.decorator'
import { LoginBodyDto, LoginResponseDto } from './dto/login.dto'
import { RegisterBodyDto } from './dto/register.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller(`accounts`)
export class AccountsController {
  public constructor(private readonly accountsService: AccountsService) {}

  @Post(`register`)
  @PublicRoute()
  public async register(@Body() body: RegisterBodyDto): Promise<void> {
    return this.accountsService.register({ body })
  }

  @Post(`login`)
  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  public async login(@Body() _body: LoginBodyDto, @RequestAccount() account: Account): Promise<LoginResponseDto> {
    return this.accountsService.login({ account })
  }
}
