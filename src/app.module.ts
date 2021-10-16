import { BadRequestException, Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { ValidationError } from 'class-validator'

import { AccountsModule } from './accounts/accounts.module'
import { ConfigurationModule } from './configuration/configuration.module'
import { DatabaseModule } from './database/database.module'
import { TweetsModule } from './tweets/tweets.module'

@Module({
  imports: [DatabaseModule, ConfigurationModule, AccountsModule, TweetsModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        disableErrorMessages: true,
        exceptionFactory: (errors: ValidationError[]): BadRequestException => {
          return new BadRequestException(errors)
        },
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
