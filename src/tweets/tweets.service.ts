import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { Tweet } from './tweet.entity'

@Injectable()
export class TweetsService extends TypeOrmCrudService<Tweet> {
  public constructor(@InjectRepository(Tweet) public readonly repo: Repository<Tweet>) {
    super(repo)
  }

  public override async deleteOne(crudRequest: CrudRequest): Promise<void> {
    const tweet: Tweet = await this.getOneOrFail(crudRequest)

    await this.repo.softRemove(tweet)
  }
}
