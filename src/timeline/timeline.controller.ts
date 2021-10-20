import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { Account } from '../accounts/account.entity'
import { RequestAccount } from '../accounts/decorators/request-account.decorator'
import { TimelineTweet } from './timeline.dto'
import { TimelineService } from './timeline.service'

@Controller(`timeline`)
@ApiBearerAuth()
@ApiTags(TimelineController.name)
export class TimelineController {
  public constructor(private readonly timelineService: TimelineService) {}

  @Get(`me`)
  @ApiOperation({ description: `Get all tweets that have been created by currently logged in user.` })
  @ApiOkResponse({ type: [TimelineTweet] })
  public async getMyTimeline(@RequestAccount() account: Account): Promise<TimelineTweet[]> {
    return this.timelineService.getMyTimeline(account)
  }

  @Get(`home`)
  @ApiOperation({ description: `Get all tweets that come from people followed by currently logged in user.` })
  @ApiOkResponse({ type: [TimelineTweet] })
  public async getHomeTimeline(@RequestAccount() account: Account): Promise<TimelineTweet[]> {
    return this.timelineService.getHomeTimeline(account)
  }
}
