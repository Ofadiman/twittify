import { ClassConstructor } from 'class-transformer'
import { Column, Entity, ManyToOne } from 'typeorm'

import { Account } from '../accounts/account.entity'
import { BaseEntity } from '../database/utils/base-entity'
import { Tweet } from '../tweets/tweet.entity'
import { CommentConstraints } from './enums/comment-constraints.enum'

@Entity()
export class Comment extends BaseEntity {
  @Column({ length: CommentConstraints.ContentMaxLength })
  public content: string

  @ManyToOne((): ClassConstructor<Account> => Account, (account: Account): Comment[] => account.comments)
  public account: Account

  @ManyToOne((): ClassConstructor<Tweet> => Tweet, (tweet: Tweet): Comment[] => tweet.comments)
  public tweet: Tweet
}
