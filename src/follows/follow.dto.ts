import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { IsInt, IsPositive } from 'class-validator'

import { Account } from '../accounts/account.entity'
import { BaseEntity } from '../database/utils/base-entity'

class Followee extends PickType(Account, [`id`, `createDate`, `updateDate`, `deleteDate`, `email`]) {}

class FollowDto {
  @ApiProperty({ description: `A person that is followed by somebody.`, type: Followee })
  public followee: Followee
}

export class CreateOneFollowBodyDto {
  @IsInt()
  @IsPositive()
  public followee: number
}

export class CreateOneFollowResponseDto extends IntersectionType(BaseEntity, FollowDto) {}

export class GetOneFollowResponseDto extends IntersectionType(BaseEntity, FollowDto) {}
