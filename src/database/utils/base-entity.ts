import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number

  @CreateDateColumn({ update: false })
  public readonly createDate: Date

  @UpdateDateColumn({ update: false })
  public readonly updateDate: Date

  @DeleteDateColumn({ update: false })
  public readonly deleteDate: Date
}
