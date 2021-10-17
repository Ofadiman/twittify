import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator'

import { BaseEntity } from '../database/utils/base-entity'
import { CommentConstraints } from './enums/comment-constraints.enum'

class CommentDto {
  @IsString()
  @MaxLength(CommentConstraints.ContentMaxLength)
  @MinLength(CommentConstraints.ContentMinLength)
  @ApiProperty({ description: `The content of the comment.`, example: `Thanks for that brilliant tweet!` })
  public content: string

  @IsInt()
  @IsPositive()
  public tweet: number
}

export class CreateOneCommentBodyDto extends PickType(CommentDto, [`content`, `tweet`]) {}

export class CreateOneCommentResponseDto extends IntersectionType(
  PickType(CommentDto, [`content`, `tweet`]),
  BaseEntity
) {}

export class GetOneCommentResponseDto extends IntersectionType(PickType(CommentDto, [`content`]), BaseEntity) {}

export class UpdateOneCommentBodyDto extends PickType(CommentDto, [`content`]) {}

export class UpdateOneCommentResponseDto extends IntersectionType(PickType(CommentDto, [`content`]), BaseEntity) {}
