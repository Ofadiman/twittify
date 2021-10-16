import { ApiProperty } from '@nestjs/swagger'
import { ClassConstructor } from 'class-transformer'
import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from '../database/utils/base-entity'
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
}
