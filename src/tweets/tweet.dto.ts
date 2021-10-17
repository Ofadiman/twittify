import { IntersectionType, PickType } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

import { BaseEntity } from '../database/utils/base-entity'
import { TweetConstraints } from './enums/tweet-constraints.enum'

class TweetDto {
  @IsString()
  @MaxLength(TweetConstraints.TweetMaxLength)
  @MinLength(TweetConstraints.TweetMinLength)
  public content: string
}

export class CreateOneTweetBodyDto extends PickType(TweetDto, [`content`]) {}

export class CreateOneTweetResponseDto extends IntersectionType(PickType(TweetDto, [`content`]), BaseEntity) {}

export class UpdateOneTweetBodyDto extends PickType(TweetDto, [`content`]) {}

export class UpdateOneTweetResponseDto extends IntersectionType(PickType(TweetDto, [`content`]), BaseEntity) {}

export class GetOneTweetResponseDto extends IntersectionType(PickType(TweetDto, [`content`]), BaseEntity) {}
