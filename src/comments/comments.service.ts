import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { Comment } from './comment.entity'

@Injectable()
export class CommentsService extends TypeOrmCrudService<Comment> {
  public constructor(@InjectRepository(Comment) public readonly repo: Repository<Comment>) {
    super(repo)
  }

  public override async deleteOne(crudRequest: CrudRequest): Promise<void> {
    const comment: Comment = await this.getOneOrFail(crudRequest)

    await this.repo.softRemove(comment)
  }
}
