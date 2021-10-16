import { IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator'

import { TweetConstraints } from '../enums/tweet-constraints.enum'

export class CreateTweetBodyDto {
  @IsString()
  @MaxLength(TweetConstraints.TweetMaxLength)
  @MinLength(TweetConstraints.TweetMinLength)
  public content: string

  @IsInt()
  @IsPositive()
  public account: number
}
