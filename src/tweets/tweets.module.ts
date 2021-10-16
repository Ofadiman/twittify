import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Tweet } from './tweet.entity'
import { TweetsController } from './tweets.controller'
import { TweetsService } from './tweets.service'

@Module({
  controllers: [TweetsController],
  exports: [TweetsService],
  imports: [TypeOrmModule.forFeature([Tweet])],
  providers: [TweetsService]
})
export class TweetsModule {}
