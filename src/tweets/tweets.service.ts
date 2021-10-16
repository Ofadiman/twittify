import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { Tweet } from './tweet.entity'

@Injectable()
export class TweetsService extends TypeOrmCrudService<Tweet> {
  public constructor(@InjectRepository(Tweet) public readonly repo: Repository<Tweet>) {
    super(repo)
  }
}
