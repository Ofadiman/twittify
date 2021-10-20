import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Follow } from './follow.entity'
import { FollowsController } from './follows.controller'
import { FollowsService } from './follows.service'

@Module({
  controllers: [FollowsController],
  exports: [FollowsService],
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowsService]
})
export class FollowsModule {}
