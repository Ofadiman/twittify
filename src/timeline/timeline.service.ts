import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder'

import { Account } from '../accounts/account.entity'
import { Follow } from '../follows/follow.entity'
import { Tweet } from '../tweets/tweet.entity'
import { TimelineTweet } from './timeline.dto'

@Injectable()
export class TimelineService {
  public constructor(@InjectRepository(Tweet) private readonly tweetsRepository: Repository<Tweet>) {}

  public async getHomeTimeline(account: Account): Promise<TimelineTweet[]> {
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
      .leftJoin(`tweets.comments`, `comments`)
      .leftJoin(`tweets.account`, `account`)
      .leftJoin(`account.following`, `following`)
      .where((queryBuilder: SelectQueryBuilder<Tweet>): unknown => {
        const subQuery: string = queryBuilder
          .subQuery()
          .select(`follows.followee_id`)
          .from(Follow, `follows`)
          .where(`follower_id = :followerId`)
          .getQuery()

        return `tweets.account_id IN ${subQuery}`
      })
      .setParameter(`followerId`, account.id)
      .getMany() as unknown as Promise<TimelineTweet[]>
  }

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
