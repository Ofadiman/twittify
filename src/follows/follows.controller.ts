import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud'
import { SCondition } from '@nestjsx/crud-request/lib/types/request-query.types'

import { AuthenticatedRequest } from '../common/types/authenticated-request.type'
import { CreateOneFollowBodyDto, CreateOneFollowResponseDto, GetOneFollowResponseDto } from './follow.dto'
import { Follow } from './follow.entity'
import { FollowsService } from './follows.service'

@Controller(`follows`)
@ApiTags(FollowsController.name)
@ApiBearerAuth()
@Crud({
  dto: {
    create: CreateOneFollowBodyDto
  },
  model: {
    type: Follow
  },
  query: {
    join: {
      followee: {
        eager: true,
        exclude: [`password`]
      }
    }
  },
  routes: {
    createOneBase: {
      decorators: [ApiCreatedResponse({ type: CreateOneFollowResponseDto })]
    },
    getOneBase: {
      decorators: [ApiOkResponse({ type: GetOneFollowResponseDto })]
    },
    only: [`createOneBase`, `deleteOneBase`, `getOneBase`]
  }
})
@CrudAuth({
  persist: (request: AuthenticatedRequest): SCondition => {
    return {
      follower: request.user.id
    }
  }
})
export class FollowsController implements CrudController<Follow> {
  public constructor(public readonly service: FollowsService) {}
}
