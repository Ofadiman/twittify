import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud'
import { SCondition } from '@nestjsx/crud-request/lib/types/request-query.types'

import { AuthenticatedRequest } from '../common/types/authenticated-request.type'
import {
  CreateOneCommentBodyDto,
  CreateOneCommentResponseDto,
  GetOneCommentResponseDto,
  UpdateOneCommentBodyDto,
  UpdateOneCommentResponseDto
} from './comment.dto'
import { Comment } from './comment.entity'
import { CommentsService } from './comments.service'

@Controller(`comments`)
@ApiTags(CommentsController.name)
@ApiBearerAuth()
@Crud({
  dto: {
    create: CreateOneCommentBodyDto,
    update: UpdateOneCommentBodyDto
  },
  model: {
    type: Comment
  },
  routes: {
    createOneBase: {
      decorators: [ApiCreatedResponse({ type: CreateOneCommentResponseDto })]
    },
    deleteOneBase: {
      decorators: [ApiNoContentResponse({ description: `The comment has been successfully deleted.` })]
    },
    getOneBase: {
      decorators: [ApiOkResponse({ type: GetOneCommentResponseDto })]
    },
    only: [`createOneBase`, `getOneBase`, `updateOneBase`, `deleteOneBase`],
    updateOneBase: {
      decorators: [ApiOkResponse({ type: UpdateOneCommentResponseDto })]
    }
  }
})
@CrudAuth({
  filter: (request: AuthenticatedRequest): SCondition => {
    if (request.method === `GET`) {
      return {
        deleteDate: {
          $isnull: true
        }
      }
    }

    return {
      'Comment.account_id': request.user.id,
      deleteDate: {
        $isnull: true
      }
    }
  },
  persist: (request: AuthenticatedRequest): SCondition => {
    if (request.method === `GET`) {
      return {}
    }

    return {
      account: request.user.id
    }
  }
})
export class CommentsController implements CrudController<Comment> {
  public constructor(public readonly service: CommentsService) {}
}
