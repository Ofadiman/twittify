import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BcryptService } from '../common/services/bcrypt.service'
import { Account } from './account.entity'
import { AccountsController } from './accounts.controller'
import { AccountsService } from './accounts.service'

@Module({
  controllers: [AccountsController],
  exports: [AccountsService],
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountsService, BcryptService]
})
export class AccountsModule {}
