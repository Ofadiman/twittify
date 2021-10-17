import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud'
import { SCondition } from '@nestjsx/crud-request/lib/types/request-query.types'
import { Request } from 'express'

import { Account } from '../accounts/account.entity'
import {
  CreateOneTweetBodyDto,
  CreateOneTweetResponseDto,
  GetOneTweetResponseDto,
  UpdateOneTweetBodyDto,
  UpdateOneTweetResponseDto
} from './tweet.dto'
import { Tweet } from './tweet.entity'
import { TweetsService } from './tweets.service'

@Controller(`tweets`)
@ApiTags(TweetsController.name)
@ApiBearerAuth()
@Crud({
  dto: {
    create: CreateOneTweetBodyDto,
    update: UpdateOneTweetBodyDto
  },
  model: {
    type: Tweet
  },
  query: {
    maxLimit: 100
  },
  routes: {
    createOneBase: {
      decorators: [ApiCreatedResponse({ type: CreateOneTweetResponseDto })]
    },
    deleteOneBase: {
      decorators: [ApiNoContentResponse()]
    },
    getOneBase: {
      decorators: [ApiOkResponse({ type: GetOneTweetResponseDto })]
    },
    only: [`createOneBase`, `updateOneBase`, `getOneBase`, `deleteOneBase`],
    updateOneBase: {
      decorators: [ApiOkResponse({ type: UpdateOneTweetResponseDto })]
    }
  }
})
@CrudAuth({
  filter: (request: Request & { user: Account }): SCondition => {
    if (request.method === `GET`) {
      return {
        deleteDate: {
          $isnull: true
        }
      }
    }

    return {
      'Tweet.account_id': request.user.id,
      deleteDate: {
        $isnull: true
      }
    }
  },
  persist: (request: Request & { user: Account }): SCondition => {
    if (request.method === `GET`) {
      return {}
    }

    return {
      account: request.user.id
    }
  }
})
export class TweetsController implements CrudController<Tweet> {
  public constructor(public readonly service: TweetsService) {}
}
