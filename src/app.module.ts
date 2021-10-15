import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'

import { AccountsModule } from './accounts/accounts.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigurationModule } from './configuration/configuration.module'
import { DatabaseModule } from './database/database.module'

@Module({
  controllers: [AppController],
  imports: [DatabaseModule, ConfigurationModule, AccountsModule],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        disableErrorMessages: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
        validationError: {
          target: false,
          value: true
        }
      })
    }
  ]
})
export class AppModule {}
