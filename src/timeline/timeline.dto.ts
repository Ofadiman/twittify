import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'

import { Account } from '../accounts/account.entity'
import { Comment } from '../comments/comment.entity'
import { BaseEntity } from '../database/utils/base-entity'
import { Tweet } from '../tweets/tweet.entity'

class TimelineAccount extends IntersectionType(BaseEntity, PickType(Account, [`email`])) {}

class TimelineComment extends IntersectionType(PickType(Comment, [`content`]), BaseEntity) {
  @ApiProperty({ description: `Account entity returned during timeline generation.` })
  public account: TimelineAccount
}

export class TimelineTweet extends IntersectionType(BaseEntity, PickType(Tweet, [`content`])) {
  @ApiProperty({ description: `Comment entity returned during timeline generation.` })
  public comments: TimelineComment
}
