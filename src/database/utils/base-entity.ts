import { ApiProperty } from '@nestjs/swagger'
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 15 })
  public readonly id: number

  @CreateDateColumn({ update: false })
  @ApiProperty({ example: `2021-10-16T14:00:00.000Z` })
  public readonly createDate: Date

  @UpdateDateColumn({ update: false })
  @ApiProperty({ example: `2021-10-16T14:00:00.000Z` })
  public readonly updateDate: Date

  @DeleteDateColumn({ update: false })
  @ApiProperty({ example: `2021-10-16T14:00:00.000Z`, nullable: true, type: Date })
  public readonly deleteDate: Date | null
}
