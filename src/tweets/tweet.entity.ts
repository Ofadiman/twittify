import { ClassConstructor } from 'class-transformer'
import { Column, Entity, ManyToOne } from 'typeorm'

import { Account } from '../accounts/account.entity'
import { BaseEntity } from '../database/utils/base-entity'
import { TweetConstraints } from './enums/tweet-constraints.enum'

@Entity()
export class Tweet extends BaseEntity {
  @Column({ length: TweetConstraints.TweetMaxLength })
  public content: string

  @ManyToOne((): ClassConstructor<Account> => Account, (account: Account): Tweet[] => account.tweets)
  public account: Account
}
