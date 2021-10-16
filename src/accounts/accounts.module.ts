import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BcryptService } from '../common/services/bcrypt.service'
import { ConfigurationModule } from '../configuration/configuration.module'
import { ConfigurationService } from '../configuration/configuration.service'
import { Account } from './account.entity'
import { AccountsController } from './accounts.controller'
import { AccountsService } from './accounts.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  controllers: [AccountsController],
  exports: [AccountsService],
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (configurationService: ConfigurationService): JwtModuleOptions => {
        return configurationService.jwtModuleOptions
      }
    })
  ],
  providers: [
    AccountsService,
    BcryptService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AccountsModule {}
