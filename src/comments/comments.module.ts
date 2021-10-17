import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Comment } from './comment.entity'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

@Module({
  controllers: [CommentsController],
  exports: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService]
})
export class CommentsModule {}
