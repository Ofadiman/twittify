import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../database/utils/base-entity'
import { AccountConstraints } from './enums/account-constraints.enum'

@Entity()
export class Account extends BaseEntity {
  @Column({ length: AccountConstraints.MaximumEmailLength, unique: true })
  public email: string

  @Column()
  public password: string
}
