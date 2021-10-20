import { ClassConstructor } from 'class-transformer'
import { Entity, ManyToOne, Unique } from 'typeorm'

import { Account } from '../accounts/account.entity'
import { BaseEntity } from '../database/utils/base-entity'

@Entity()
@Unique([`follower`, `followee`])
export class Follow extends BaseEntity {
  @ManyToOne((): ClassConstructor<Account> => Account, (account: Account): Follow[] => account.following, {
    nullable: false
  })
  public follower: Account

  @ManyToOne((): ClassConstructor<Account> => Account, (account: Account): Follow[] => account.followedBy, {
    nullable: false
  })
  public followee: Account
}
