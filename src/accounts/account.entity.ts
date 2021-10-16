import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../database/utils/base-entity'
import { AccountConstraints } from './enums/account-constraints.enum'

@Entity()
export class Account extends BaseEntity {
  @Column({ length: AccountConstraints.EmailMaxLength, unique: true })
  @ApiProperty({ example: `john.doe@gmail.com` })
  public email: string

  @Column()
  public password: string
}
