import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { Follow } from './follow.entity'

@Injectable()
export class FollowsService extends TypeOrmCrudService<Follow> {
  public constructor(@InjectRepository(Follow) public readonly repo: Repository<Follow>) {
    super(repo)
  }
}
