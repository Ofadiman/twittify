import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigurationModule } from './configuration/configuration.module'
import { DatabaseModule } from './database/database.module'

@Module({
  controllers: [AppController],
  imports: [DatabaseModule, ConfigurationModule],
  providers: [AppService]
})
export class AppModule {}
