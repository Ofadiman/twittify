import { Module } from '@nestjs/common'

import { TweetsModule } from '../tweets/tweets.module'
import { TimelineController } from './timeline.controller'
import { TimelineService } from './timeline.service'

@Module({
  controllers: [TimelineController],
  exports: [TimelineService],
  imports: [TweetsModule],
  providers: [TimelineService]
})
export class TimelineModule {}
