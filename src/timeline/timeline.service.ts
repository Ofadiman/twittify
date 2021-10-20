import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Account } from '../accounts/account.entity'
import { Tweet } from '../tweets/tweet.entity'
import { TimelineTweet } from './timeline.dto'

@Injectable()
export class TimelineService {
  public constructor(@InjectRepository(Tweet) private readonly tweetsRepository: Repository<Tweet>) {}

  public async getMyTimeline(account: Account): Promise<TimelineTweet[]> {
    return this.tweetsRepository
      .createQueryBuilder(`tweets`)
      .select([
        `tweets.id`,
        `tweets.account`,
        `tweets.createDate`,
        `tweets.updateDate`,
        `tweets.deleteDate`,
        `comments.id`,
        `comments.createDate`,
        `comments.updateDate`,
        `comments.deleteDate`,
        `comments.content`,
        `account.id`,
        `account.createDate`,
        `account.updateDate`,
        `account.deleteDate`,
        `account.email`
      ])
      .orderBy(`tweets.createDate`, `DESC`)
      .where(`tweets.account_id = :accountId`, { accountId: account.id })
      .take(10)
      .leftJoin(`tweets.comments`, `comments`)
      .leftJoin(`comments.account`, `account`)
      .getMany() as unknown as Promise<TimelineTweet[]>
  }
}
