import { ApiProperty } from '@nestjs/swagger'
import { ClassConstructor } from 'class-transformer'
import { Column, Entity, OneToMany } from 'typeorm'

import { Comment } from '../comments/comment.entity'
import { BaseEntity } from '../database/utils/base-entity'
import { Follow } from '../follows/follow.entity'
import { Tweet } from '../tweets/tweet.entity'
import { AccountConstraints } from './enums/account-constraints.enum'

@Entity()
export class Account extends BaseEntity {
  @Column({ length: AccountConstraints.EmailMaxLength, unique: true })
  @ApiProperty({ example: `john.doe@gmail.com` })
  public email: string

  @Column()
  public password: string

  @OneToMany((): ClassConstructor<Tweet> => Tweet, (tweet: Tweet): Account => tweet.account)
  public tweets: Tweet[]

  @OneToMany((): ClassConstructor<Comment> => Comment, (comment: Comment): Account => comment.account)
  public comments: Comment[]

  @OneToMany((): ClassConstructor<Follow> => Follow, (follow: Follow): Account => follow.followee)
  public following: Follow[]

  @OneToMany((): ClassConstructor<Follow> => Follow, (follow: Follow): Account => follow.follower)
  public followedBy: Follow[]
}
